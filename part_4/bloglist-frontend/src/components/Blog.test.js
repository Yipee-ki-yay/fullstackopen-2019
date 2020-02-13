import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('BLOG', () => {
  let component;
  const blog = {
    title: 'Abba',
    author: {name: 'Abba1'},
    likes: 4,
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} />
    )
  })

  test('renders content', () => {
    const title = component.container.querySelector('.blog__title')

    expect(title).toHaveTextContent(
      'Abba'
    )
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.container.querySelector('.blog__title')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })
})