import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getUser, getFields } from 'utils'

export const fetchUsers = createAsyncThunk('fetchUsers', username =>
  fetch(`https://api.github.com/search/users?q=${username}&page=1&per_page=5`).then(response => {
    if (response.status === 403) throw new Error('403 - you are searching too often!')
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
    return response.json()
  })
)

export const fetchUserRepos = createAsyncThunk('fetchUserRepos', username =>
  fetch(`https://api.github.com/users/${username}/repos`).then(response => {
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
    return response.json()
  })
)

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    currentPage: 1,
    isUsernameBeingSearched: false
  },
  reducers: {
    clearUsers(state) {
      state.items = []
    }
  },
  extraReducers: {
    [fetchUsers.pending](state) {
      state.isUsernameBeingSearched = true
    },
    [fetchUsers.fulfilled](state, action) {
      console.log('fulfilled')
      state.items = action.payload.items.map(getFields(['id', 'login', 'repos']))
      state.isUsernameBeingSearched = false
    },
    [fetchUsers.rejected](state, action) {
      console.error('💥 Oh no, something went wrong!')
      console.error(`${action.error.name}: ${action.error.message}`)
      state.isUsernameBeingSearched = false
    },
    [fetchUserRepos.pending](state, action) {
      const user = getUser(action.meta.arg, state)
      user.areReposBeingFetched = true
    },
    [fetchUserRepos.fulfilled](state, action) {
      const user = getUser(action.meta.arg, state)
      user.repos = action.payload.map(getFields(['id', 'name', 'description', 'stargazers_count', 'html_url']))
      user.areReposBeingFetched = false
    },
    [fetchUserRepos.rejected](state, action) {
      console.error('💥 Oh no, something went wrong!')
      console.error(`${action.error.name}: ${action.error.message}`)
      const user = getUser(action.meta.arg, state)
      user.areReposBeingFetched = false
    }
  }
})

export const { saveUsers, appendUsers, clearUsers } = usersSlice.actions
export default usersSlice.reducer
