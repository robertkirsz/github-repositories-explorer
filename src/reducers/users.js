import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getUser, getFields } from 'utils'

export const fetchUsers = createAsyncThunk(
  'fetchUsers',
  ({ username }, { getState }) => {
    const { currentPage } = getState().users

    return fetch(`https://api.github.com/search/users?q=${username}&page=${currentPage}&per_page=5`).then(response => {
      if (response.status === 403) throw new Error('403 - you are searching too often!')
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
      return response.json()
    })
  },
  {
    condition: (_, { getState }) => {
      if (getState().users.isUsernameBeingSearched) return false
    }
  }
)

export const fetchUserRepos = createAsyncThunk(
  'fetchUserRepos',
  username =>
    fetch(`https://api.github.com/users/${username}/repos`).then(response => {
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
      return response.json()
    }),
  {
    condition: (username, { getState }) => {
      const { reposAlreadyFetched, areReposBeingFetched } = getUser(username, getState().users.items)
      if (reposAlreadyFetched || areReposBeingFetched) return false
    }
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    currentPage: 1,
    lastSearchedUsername: '',
    isUsernameBeingSearched: false
  },
  reducers: {
    clearUsers(state) {
      state.items = []
      state.lastSearchedUsername = ''
    }
  },
  extraReducers: {
    [fetchUsers.pending](state, action) {
      const { username, searchMore } = action.meta.arg
      state.lastSearchedUsername = username
      state.isUsernameBeingSearched = true
      state.currentPage = searchMore ? state.currentPage + 1 : 1
    },
    [fetchUsers.fulfilled](state, action) {
      const { searchMore } = action.meta.arg
      const newItems = action.payload.items.map(getFields(['id', 'login']))
      state.items = searchMore ? [...state.items, ...newItems] : newItems
      state.isUsernameBeingSearched = false
    },
    [fetchUsers.rejected](state, action) {
      console.error('💥 Oh no, something went wrong!')
      console.error(`${action.error.name}: ${action.error.message}`)
      state.isUsernameBeingSearched = false
    },
    [fetchUserRepos.pending](state, action) {
      const user = getUser(action.meta.arg, state.items)
      user.areReposBeingFetched = true
    },
    [fetchUserRepos.fulfilled](state, action) {
      const user = getUser(action.meta.arg, state.items)
      user.repos = action.payload.map(getFields(['id', 'name', 'description', 'stargazers_count', 'html_url']))
      user.areReposBeingFetched = false
      user.reposAlreadyFetched = true
    },
    [fetchUserRepos.rejected](state, action) {
      console.error('💥 Oh no, something went wrong!')
      console.error(`${action.error.name}: ${action.error.message}`)
      const user = getUser(action.meta.arg, state.items)
      user.areReposBeingFetched = false
    }
  }
})

export const { saveUsers, appendUsers, clearUsers } = usersSlice.actions
export default usersSlice.reducer
