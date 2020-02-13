import React from 'react'
import { 
  render, waitForElement, fireEvent
} from '@testing-library/react'
jest.mock('./services/blogs')
jest.mock('./services/login')
import '@testing-library/jest-dom/extend-expect'
import { prettyDOM } from '@testing-library/dom'
import App from './App'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    ) 

    // console.log(prettyDOM(component.container))
    
    
    expect(component.container).toHaveTextContent(
      'Login to app'
    )

    expect(component.container).not.toHaveTextContent(
      'Create new'
    )
  })

  test('if user is logged in, the blog posts are rendered to the page.', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    };
    localStorage.setItem('loggedUser', JSON.stringify(user));

    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.container.querySelector('.blog'));

    const blogs = component.container.querySelectorAll('.blog');
    expect(blogs.length).toBe(2);
  });
})