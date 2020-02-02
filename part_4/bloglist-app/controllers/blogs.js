const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('author', { username: 1, name: 1, id: 1 });
  response.json(blogs);
  // Blog
  //   .find({})
  //   .then(blogs => {
  //     response.json(blogs)
  //   })
})

blogsRouter.get('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if ( blog ) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  } catch ( exeption ) {
    console.log(exeption);
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id);
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    
    if ( blog.author.toString() !== decodedToken.id ) {
      return response.status(403).json({ error: 'Only user that created the item may delete it' });
    }
    await blog.remove();
    response.status(204).end()
  } catch(exeption) {
    console.log(exeption);
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body;

  if ( !body.title || !body.url) {
    response.status(400).end();
  } else {
    try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }

      const user = await User.findById(body.userId)

      const blog = new Blog({
        title: body.title,
        url: body.url,
        likes: body.likes,
        author: user._id
      })
      
      const savedBlog = await blog.save();
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.status(201).json(savedBlog.toJSON())
    } catch (exeption) {
      next(exeption);
    }
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog.toJSON())
  } catch (exeption) {
    console.log(exeption);
  }
})

module.exports = blogsRouter