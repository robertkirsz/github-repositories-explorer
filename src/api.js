const base = 'https://api.github.com'

function fetchUsers(query, page = 1, perPage = 10) {
  return fetch(`${base}/search/users?q=${query}&page=${page}&per_page=${perPage}`).then(response => response.json())
}

function fetchUserRepos(username, page = 1, perPage = 10) {
  return fetch(`${base}/users/${username}/repos?page=${page}&per_page=${perPage}`).then(response => response.json())
}

export default { fetchUsers, fetchUserRepos }
