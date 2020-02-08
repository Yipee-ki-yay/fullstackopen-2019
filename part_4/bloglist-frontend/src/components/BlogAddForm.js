import React, { useState } from 'react'

const BlogAddForm = ({addBlog}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmitBlog = (e) => {
    e.preventDefault();

    const newBlog = {
      title, author, url
    }

    addBlog(newBlog)

    setTitle('')
    setAuthor('')
    setUrl('')
  }
  
  return (
    <form onSubmit={handleSubmitBlog}>
      <div>
        <span>title:</span>
        <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <span>author:</span>
        <input type="text" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <div>
        <span>url:</span>
        <input type="text" name="url" value={url} onChange={(e) => setUrl(e.target.value)} />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogAddForm;