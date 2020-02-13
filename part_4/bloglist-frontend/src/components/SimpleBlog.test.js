import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
  const blog = {
    title: 'Abba',
    author: 'Abba1',
    likes: 4,
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  const title = component.container.querySelector('.simple-blog__title')
  const likes = component.container.querySelector('.simple-blog__likes')

  console.log(prettyDOM(title))
  expect(title).toHaveTextContent(
    'Abba'
  )

  expect(title).toHaveTextContent(
    'Abba1'
  )

  expect(likes).toHaveTextContent(
    4
  )
})

test('clicking the button calls event handler twice', () => {
  const blog = {
    title: 'Abba',
    author: 'Abba1',
    likes: 4,
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})