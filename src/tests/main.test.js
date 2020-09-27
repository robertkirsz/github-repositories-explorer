import { rest } from 'msw'
import { setupServer } from 'msw/node'
import '@testing-library/jest-dom/extend-expect'
import store from 'store'
import { fetchUsers } from 'reducers/users'
import mockedFetchUsersResponse from 'mocks/fetch-users-response'

const server = setupServer(
  rest.get('https://api.github.com/search/*', (req, res, ctx) => res(ctx.json(mockedFetchUsersResponse)))
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Propery saves users in the store', async () => {
  expect(store.getState().users.items).toHaveLength(0)

  store.dispatch(fetchUsers({ username: 'does-not-matter-for-tests' })).then(() => {
    expect(store.getState().users.items).toHaveLength(5)
  })
})
