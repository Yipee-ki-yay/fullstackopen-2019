const Blog = require('../models/blog')
const User = require('../models/user')

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

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, 
  // nonExistingId, 
  blogsInDb,
  usersInDb
}