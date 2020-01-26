const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Blog1",
    author: "Abba",
    url: "Ab",
    likes: 5,
  },
  {
    title: "Blog2",
    author: "Abbaa",
    url: "Ab",
    likes: 7,
  },
  {
    title: "Blog2",
    author: "Abbaa",
    url: "Ab",
    likes: 7,
  },
  {
    title: "Blog2",
    author: "Abbaa",
    url: "Ab",
    likes: 7,
  }
]

// const nonExistingId = async () => {
//   const note = new Note({ content: 'willremovethissoon' })
//   await note.save()
//   await note.remove()

//   return note._id.toString()
// }

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(note => note.toJSON())
}

module.exports = {
  initialBlogs, 
  // nonExistingId, 
  blogsInDb
}