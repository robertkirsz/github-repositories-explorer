import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent } from 'tests/test-utils'
import '@testing-library/jest-dom/extend-expect'
import store from 'store'
import App from 'components/App'

const server = setupServer(
  rest.get('https://api.github.com/search/users', (request, response, context) => {
    const pages = {
      1: [
        {
          id: 1,
          login: 'john',
          repos_url: 'https://api.github.com/users/john/repos'
        },
        {
          id: 2,
          login: 'johnny',
          repos_url: 'https://api.github.com/users/johnny/repos'
        }
      ],
      2: [
        {
          id: 3,
          login: 'jonnie',
          repos_url: 'https://api.github.com/users/jonnie/repos'
        }
      ]
    }

    return response(context.json({ items: pages[request.url.searchParams.get('page')] }))
  }),
  rest.get('https://api.github.com/users/:username/repos', (_, response, context) =>
    response(
      context.json([
        {
          id: 1,
          name: "John's repo",
          description: "John's first project",
          stargazers_count: 2,
          html_url: 'https://github.com/john/johns-repo'
        }
      ])
    )
  )
)

test('The flow works', async () => {
  // Start server
  server.listen()

  // Render the app
  const { container, getByText, findByText, getByPlaceholderText } = render(<App />)

  // Title should be visible from the start
  expect(getByText('GitHub Repositories Explorer')).toBeVisible()

  // Type "john" into the text field
  fireEvent.change(getByPlaceholderText('Enter username'), { target: { value: 'john' } })

  // Loader should appear
  expect(await findByText('Loading...')).toBeVisible()
  expect(store.getState().users.lastSearchedUsername).toEqual('john')

  // Info label should appear after we get 'fetchUsers' API response
  expect(await findByText('Showing users for "john"')).toBeVisible()
  expect(store.getState().users.items).toHaveLength(2)

  // These two users should be visible
  expect(getByText('john')).toBeVisible()
  expect(getByText('johnny')).toBeVisible()

  // Click the "Search more" button
  fireEvent.click(getByText('Search more'))

  // Wait for another 'fetchUsers' API response
  expect(await findByText('Loading...')).toBeVisible()
  expect(store.getState().users.currentPage).toEqual(2)

  // Third user should appear
  expect(await findByText('jonnie')).toBeVisible()
  expect(store.getState().users.items).toHaveLength(3)

  // Click on the first user
  fireEvent.click(getByText('john'))

  // Repository info should appear after we get 'fetchUserRepos' API response
  expect(await findByText('Loading...')).toBeVisible()
  expect(await findByText("John's repo")).toBeVisible()
  expect(store.getState().users.items[0].repos).toHaveLength(1)

  // Make sure the UI didn't change
  expect(container).toMatchSnapshot()

  // Stop server
  server.resetHandlers()
  server.close()
})
