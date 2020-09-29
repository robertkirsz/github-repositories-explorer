import { rest } from 'msw'

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

const repos = [
  {
    id: 1,
    name: "John's repo",
    description: "John's first project",
    stargazers_count: 2,
    html_url: 'https://github.com/john/johns-repo'
  }
]

export const fetchUsersMock = rest.get('https://api.github.com/search/users', (request, response, context) =>
  response(context.json({ items: pages[request.url.searchParams.get('page')] }))
)

export const fetchUsersErrorMock = rest.get('https://api.github.com/search/users', (_, response, context) =>
  response(context.status(500))
)

export const fetchUserReposMock = rest.get('https://api.github.com/users/:username/repos', (_, response, context) =>
  response(context.json(repos))
)

export const fetchUserReposErrorMock = rest.get(
  'https://api.github.com/users/:username/repos',
  (_, response, context) => response(context.status(500))
)
