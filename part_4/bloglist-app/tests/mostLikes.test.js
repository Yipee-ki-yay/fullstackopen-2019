const mostLikes = require('../utils/list_helper').mostLikes

describe('most likes', () => {
  test('when list has only one blog', () => {
    const listWithOneBlog = [
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
      }
    ]

    const listWithOneBlogSame = {
      author: "Edsger W. Dijkstra",
      likes: 12
    }
    

    expect(mostLikes(listWithOneBlog)).toEqual(listWithOneBlogSame)
  })

  test('with the bigger likes calculated right', () => {
    const likes = [
      {
        title: "React patterns",
        author: "Michael Chan",
        likes: 7,
      },
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        likes: 5,
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,
      },
      {
        title: "First class tests",
        author: "Robert C. Martin",
        likes: 10,
      },
      {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        likes: 0,
      },
      {
        title: "Type wars",
        author: "Robert C. Martin",
        likes: 2,
      }  
    ]

    const result = {
      author: "Edsger W. Dijkstra",
      likes: 12,
    };

    expect(mostLikes(likes)).toEqual(result)
  })

  test('with the bigger likes of items with equals likes calculated right', () => {
    const likes = [
      {
        title: "React patterns",
        author: "Michael Chan",
        likes: 7,
      },
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        likes: 12,
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,
      },
      {
        title: "First class tests",
        author: "Robert C. Martin",
        likes: 10,
      },
      {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        likes: 0,
      },
      {
        title: "Type wars",
        author: "Robert C. Martin",
        likes: 2,
      }  
    ]

    const result = {
      author: "Edsger W. Dijkstra",
      likes: 12,
    };

    const result2 = {
      author: "Edsger W. Dijkstra",
      likes: 12,
    };

    expect(mostLikes(likes)).toEqual(result || result2)
  })
})