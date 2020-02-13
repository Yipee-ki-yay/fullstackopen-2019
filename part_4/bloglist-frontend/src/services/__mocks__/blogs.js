const blogs = [
  {
    id: '5e31f35872a40bc787161c94',
    title: "Blog3q",
    url: "q",
    likes: 7,
    author: {
      username: "qwerty", 
      name: "qwerty", 
      id: "5e2f4ca50645845d12fe7065"
    }
  },
  {
    id: "5e31f3720c42e8c8fae96d32",
    likes: 1,
    title: "Blog3q",
    url: "q",
    author: {
      username: "qwerty", 
      name: "qwerty", 
      id: "5e2f4ca50645845d12fe7065"
    }
  },
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }