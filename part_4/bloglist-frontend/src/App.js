import React, {useState, useEffect} from 'react';
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import BlogAddForm from './components/BlogAddForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import  { useField } from './hooks'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  // const [username, setUsername] = useState('') 
  // const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [ notificationMessage, setNotificationMessage] = useState(null)
  const [ notificationFlag, setNotificationFlag] = useState('success')

  const blogFormRef = React.createRef()

  const username = useField('text')
  const password = useField('password')

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const rows = () => blogs
    .sort((a, b) => a - b)
    .map(blog => 
      <Blog
        key={blog.id}
        blog={blog}
        handleLikes={() => handleLikes(blog.id)}
        removeBlog={() => removeBlog(blog.id)}
      />
  )

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      newBlog.userId = user.id;
      const createdBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(createdBlog))
      setNotificationMessage(`Blog ${createdBlog.title} added`);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    } catch(exception) {
      setNotificationFlag('error');
      setNotificationMessage(`${exception}`);
      setTimeout(() => {
        setNotificationFlag('success');
        setNotificationMessage(null);
      }, 5000);
    }
  }

  const handleLikes = (id) => {
    const blog = blogs.find(b => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1}

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => b.id !== id ? b : returnedBlog))
      })
      .catch(error => {
        setNotificationMessage(
          `Note '${blog.title}' was already removed from server`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
        setBlogs(blogs.filter(b => b.id !== id))
      })
  }

  const removeBlog = (id) => {
    const blog = blogs.find(b => b.id === id)
    const isRemove = window.confirm(`remove blog ${blog.title}`)
    
    if ( isRemove ) {
      blogService
        .deleteBlog(id)
        .then(returnedBlog => {
          setBlogs(blogs.filter(b => b.id !== id))
          setNotificationMessage(`Blog ${blog.title} removed`);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        }).catch(error => {
          setNotificationFlag('error');
          setNotificationMessage(`${error}`);
          setTimeout(() => {
            setNotificationFlag('success');
            setNotificationMessage(null);
          }, 5000);
        })
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value, 
        password: password.value,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      // setUsername('')
      username.setEmptyValue('')
      // setPassword('')
      password.setEmptyValue('')
      setNotificationMessage(`User ${user.username} logged in`);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    } catch (exception) {
      setNotificationFlag('error');
      setNotificationMessage(`${exception.response.data.error}`);
      setTimeout(() => {
        setNotificationFlag('success');
        setNotificationMessage(null);
      }, 5000);
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <div className="loginSection">
        <h2>Login to app</h2>
        <Notification message={notificationMessage} flag={notificationFlag} />
        <LoginForm
          handleLogin={handleLogin}
          username={username.value}
          setUsername={username.onChange}
          password={password.value}
          setPassword={password.onChange}
        />
      </div>
    )
  }

  return (
    <div className="blogSection">
      <div>
        <h2>Create new</h2>
        <Notification message={notificationMessage} flag={notificationFlag} />
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogAddForm 
            addBlog={addBlog}
          />
        </Togglable>
        <h2>Blog list</h2>
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          {rows()}
        </div>
      </div>
    </div>
  );
}

export default App;
