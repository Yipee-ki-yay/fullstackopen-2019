const mostBlogs = require('../utils/list_helper').mostBlogs

describe('most blog', () => {
  test('when list has only one blog', () => {
    const listWithOneBlog = [
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        blogs: 12
      }
    ]

    const listWithOneBlogSame = {
      author: "Edsger W. Dijkstra",
      blogs: 12
    }
    

    expect(mostBlogs(listWithOneBlog)).toEqual(listWithOneBlogSame)
  })

  test('with the bigger blogs calculated right', () => {
    const blogs = [
      {
        title: "React patterns",
        author: "Michael Chan",
        blogs: 7,
      },
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        blogs: 5,
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        blogs: 12,
      },
      {
        title: "First class tests",
        author: "Robert C. Martin",
        blogs: 10,
      },
      {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        blogs: 0,
      },
      {
        title: "Type wars",
        author: "Robert C. Martin",
        blogs: 2,
      }  
    ]

    const result = {
      author: "Edsger W. Dijkstra",
      blogs: 12,
    };

    expect(mostBlogs(blogs)).toEqual(result)
  })

  test('with the bigger blogs of items with equals blogs calculated right', () => {
    const blogs = [
      {
        title: "React patterns",
        author: "Michael Chan",
        blogs: 7,
      },
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        blogs: 12,
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        blogs: 12,
      },
      {
        title: "First class tests",
        author: "Robert C. Martin",
        blogs: 10,
      },
      {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        blogs: 0,
      },
      {
        title: "Type wars",
        author: "Robert C. Martin",
        blogs: 2,
      }  
    ]

    const result = {
      author: "Edsger W. Dijkstra",
      blogs: 12,
    };

    const result2 = {
      author: "Edsger W. Dijkstra",
      blogs: 12,
    };

    expect(mostBlogs(blogs)).toEqual(result || result2)
  })
})