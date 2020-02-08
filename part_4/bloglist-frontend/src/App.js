import React, {useState, useEffect} from 'react';
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import BlogAddForm from './components/BlogAddForm'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [ notificationMessage, setNotificationMessage] = useState(null)
  const [ notificationFlag, setNotificationFlag] = useState('success')


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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const rows = () => blogs.map(blog => 
    <Blog
      key={blog.id}
      blog={blog}
    />
  )

  const addBlog = async (newBlog) => {
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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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
      <div>
        <h2>Login to app</h2>
        <Notification message={notificationMessage} flag={notificationFlag} />
        {loginForm()} 
      </div>
    )
  }

  return (
    <div>
      <div>
        <h2>Create new</h2>
        <Notification message={notificationMessage} flag={notificationFlag} />
        <BlogAddForm 
          addBlog={addBlog}
        />
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
