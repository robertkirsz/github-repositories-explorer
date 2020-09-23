const base = 'https://api.github.com'

export function fetchUsers(query, page = 1, perPage = 10) {
  return fetch(`${base}/search/users?q=${query}&page=${page}&per_page=${perPage}`).then(response => response.json())
}

export function fetchUserRepos(username, page = 1, perPage = 10) {
  return fetch(`${base}/users/${username}/repos?page=${page}&per_page=${perPage}`).then(response => response.json())
}
