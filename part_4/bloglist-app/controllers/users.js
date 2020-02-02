const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs')
    
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async(request, response, next) => {
  try {
    const body = request.body;

    if (! body.password || body.password.length < 3 ) {
      return response.status(400).json({ error: 'password should be at least 3 characters long' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exeption) {
    next(exeption);
  }
})

module.exports = usersRouter;