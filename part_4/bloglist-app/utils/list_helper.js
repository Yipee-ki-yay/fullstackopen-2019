var _ = require('lodash');

const dummy = (blogs) => {
  return blogs.length ? true : 1;
}

const totalLikes = (listBlog) => {
  return listBlog.reduce((sum, blog) => sum += blog.likes, 0);
}

const favoriteBlog = (listBlog) => {
  return listBlog.reduce((sum, blog) => sum = sum.likes <= blog.likes ? blog : sum, {likes: 0 });
}

const mostBlogs = (listBlog) => {
  return listBlog.reduce((sum, blog) => {
    return sum = sum.blogs <= blog.blogs ? _.pick(blog, _.keys({author: null, blogs: null})) : sum;
  }, {blogs: 0 });
}

const mostLikes = (listBlog) => {
  return listBlog.reduce((sum, blog) => {
    return sum = sum.likes <= blog.likes ? _.pick(blog, _.keys({author: null, likes: null})) : sum;
  }, {likes: 0 });
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}