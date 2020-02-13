import React, {useState} from 'react'
import PropTypes from 'prop-types'

const Blog = ({blog, handleLikes, removeBlog}) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showRemoveBtn = { display: blog.author.id ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle} className='blog'>
      <div onClick={toggleVisibility} className="blog__title">
        {blog.title} {blog.author.name}
      </div>
      <div style={{display: visible ? "block" : "none"}} className="togglableContent">
        <a href={blog.url}>{blog.url}</a>
        <div>{blog.likes} likes <button onClick={handleLikes}>like</button></div>
        <div>added by {blog.author.username}</div>
        <button style={showRemoveBtn} onClick={removeBlog}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  // handleLikes: PropTypes.func.isRequired,
  // removeBlog: PropTypes.func.isRequired,
}

export default Blog