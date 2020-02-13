import React, { useState } from 'react'
import  { useField } from '../hooks'

const BlogAddForm = ({addBlog}) => {
  // const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('')
  // const [url, setUrl] = useState('')

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const { setEmptyValue: titleSetEmptyValue, ...titleAttrs } = title;
  const { setEmptyValue: authorSetEmptyValue, ...authorAttrs } = author;
  const { setEmptyValue: urlSetEmptyValue, ...urlAttrs } = url;


  const handleSubmitBlog = (e) => {
    e.preventDefault();

    const newBlog = {
      title: title.value, 
      author: author.value, 
      url: url.value
    }

    addBlog(newBlog)

    title.setEmptyValue()
    author.setEmptyValue()
    url.setEmptyValue()
    // setTitle('')
    // setAuthor('')
    // setUrl('')
  }
  
  return (
    <form onSubmit={handleSubmitBlog}>
      <div>
        <span>title:</span>
        <input {...titleAttrs} />
      </div>
      <div>
        <span>author:</span>
        <input {...authorAttrs} />
      </div>
      <div>
        <span>url:</span>
        <input {...urlAttrs} />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogAddForm;