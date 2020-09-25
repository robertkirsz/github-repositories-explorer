import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Get only selected fields so that we don't pollute the store with data we're not interested in
const prepareUsers = users => users.map(({ id, login, repos }) => ({ id, login, repos }))

const prepareRepos = repos =>
  repos.map(({ id, name, description, stargazers_count }) => ({ id, name, description, stargazers_count }))

export const fetchUsers = createAsyncThunk('fetchUsers', username =>
  fetch(`https://api.github.com/search/users?q=${username}&page=1&per_page=5`).then(response => response.json())
)

export const fetchUserRepos = createAsyncThunk('fetchUserRepos', username =>
  fetch(`https://api.github.com/users/${username}/repos?page=1&per_page=10`).then(response => response.json())
)

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    currentPage: 1,
    pending: false
  },
  reducers: {
    clearUsers(state) {
      state.items = []
    }
  },
  extraReducers: {
    [fetchUsers.pending](state) {
      state.pending = true
    },
    [fetchUsers.fulfilled](state, action) {
      state.items = prepareUsers(action.payload.items)
      state.pending = false
    },
    [fetchUsers.rejected](state, action) {
      console.error('💥 Oh no, something went wrong!')
      console.error(`${action.error.name}: ${action.error.message}`)
      state.pending = false
    },
    [fetchUserRepos.pending](state) {
      state.pending = true
    },
    [fetchUserRepos.fulfilled](state, action) {
      const login = action.meta.arg
      const itemIndex = state.items.findIndex(item => item.login === login)
      state.items[itemIndex].repos = prepareRepos(action.payload)
      state.pending = false
    },
    [fetchUserRepos.rejected](state, action) {
      console.error('💥 Oh no, something went wrong!')
      console.error(`${action.error.name}: ${action.error.message}`)
      state.pending = false
    }
  }
})

export const { saveUsers, appendUsers, clearUsers } = usersSlice.actions
export default usersSlice.reducer
