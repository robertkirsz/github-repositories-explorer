import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent } from 'tests/test-utils'
import '@testing-library/jest-dom/extend-expect'
import store from 'store'
import { resetUsersStore } from 'reducers/users'
import App from 'components/App'

const fetchUsersMock = rest.get('https://api.github.com/search/users', (request, response, context) => {
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
})

const fetchUsersErrorMock = rest.get('https://api.github.com/search/users', (_, response, context) =>
  response(context.status(500))
)

const fetchUserReposMock = rest.get('https://api.github.com/users/:username/repos', (_, response, context) =>
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

const fetchUserReposErrorMock = rest.get('https://api.github.com/users/:username/repos', (_, response, context) =>
  response(context.status(500))
)

const server = setupServer(fetchUsersMock, fetchUserReposMock)

// Establish API mocking before all tests
beforeAll(() => server.listen())

afterEach(() => {
  // Reset any request handlers that are declared as a part of our tests (i.e. for testing one-time error scenarios)
  server.resetHandlers()
  // Clear store so we don't have any leftovers from previous tests
  store.dispatch(resetUsersStore())
})

// Clean up once the tests are done
afterAll(() => server.close())

describe('The main app flow', () => {
  it('The flow works', async () => {
    // Render the app
    const { container, getByText, findByText, getByPlaceholderText } = render(<App />)

    // Title should be visible from the start
    expect(getByText('Repos Explorer')).toBeVisible()

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
  })

  it('Username searching errors are displayed', async () => {
    // Set endpoints to always return an error
    server.use(fetchUsersErrorMock)

    // Render the app
    const { getByRole, findByText, queryByText, getByPlaceholderText } = render(<App />)

    // Type "john" into the text field
    fireEvent.change(getByPlaceholderText('Enter username'), { target: { value: 'john' } })

    // Error message should be visible
    expect(await findByText('500 Internal Server Error')).toBeVisible()
    expect(store.getState().users.errorMessage).toEqual('500 Internal Server Error')

    // Click on the X button
    fireEvent.click(getByRole('error-close-button'))

    // Error should disappear
    expect(queryByText('500 Internal Server Error')).toBeNull()
    expect(store.getState().users.errorMessage).toBeNull()
  })

  it('User repos fetching errors are displayed', async () => {
    server.use(fetchUserReposErrorMock)

    // Render the app
    const { getByRole, findByText, queryByText, getByPlaceholderText } = render(<App />)

    // Type "john" into the text field
    fireEvent.change(getByPlaceholderText('Enter username'), { target: { value: 'john' } })

    // Click on the first user
    fireEvent.click(await findByText('john'))

    // Error message should be visible
    expect(await findByText('500 Internal Server Error')).toBeVisible()
    expect(store.getState().users.errorMessage).toEqual('500 Internal Server Error')

    // Click on the X button
    fireEvent.click(getByRole('error-close-button'))

    // Error should disappear
    expect(queryByText('500 Internal Server Error')).toBeNull()
    expect(store.getState().users.errorMessage).toBeNull()
  })
})
