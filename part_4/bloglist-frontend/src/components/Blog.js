import React from 'react'
const Blog = ({blog}) => {
  return (
    <div>
      {blog.title} {blog.author.name}
    </div>
  )
}


export default Blog