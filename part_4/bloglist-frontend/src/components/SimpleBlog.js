import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className="simple-blog__title">
      {blog.title} {blog.author}
    </div>
    <div className="simple-blog__likes">
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog