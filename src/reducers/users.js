import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getUser, getFields } from 'utils'

export const fetchUsers = createAsyncThunk(
  'fetchUsers',
  ({ username }, { getState, rejectWithValue }) => {
    const { currentPage } = getState().users

    return fetch(`https://api.github.com/search/users?q=${username}&page=${currentPage}&per_page=5`).then(response => {
      if (!response.ok) return rejectWithValue(`${response.status} ${response.statusText}`)
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
  (username, { rejectWithValue }) =>
    fetch(`https://api.github.com/users/${username}/repos`).then(response => {
      if (!response.ok) return rejectWithValue(`${response.status} ${response.statusText}`)
      return response.json()
    }),
  {
    condition: (username, { getState }) => {
      const { reposAlreadyFetched, areReposBeingFetched } = getUser(username, getState().users.items)
      if (reposAlreadyFetched || areReposBeingFetched) return false
    }
  }
)

const initialState = {
  items: [],
  currentPage: 1,
  lastSearchedUsername: '',
  isUsernameBeingSearched: false,
  errorMessage: null
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUsers(state) {
      state.items = []
      state.lastSearchedUsername = ''
    },
    clearErrors(state) {
      state.errorMessage = null
    },
    resetUsersStore: () => initialState
  },
  extraReducers: {
    [fetchUsers.pending](state, action) {
      const { username, searchMore } = action.meta.arg
      state.lastSearchedUsername = username
      state.isUsernameBeingSearched = true
      state.currentPage = searchMore ? state.currentPage + 1 : 1
      state.errorMessage = null
    },
    [fetchUsers.fulfilled](state, action) {
      const { searchMore } = action.meta.arg
      const newItems = action.payload.items.map(getFields(['id', 'login']))
      state.items = searchMore ? [...state.items, ...newItems] : newItems
      state.isUsernameBeingSearched = false
    },
    [fetchUsers.rejected](state, action) {
      state.isUsernameBeingSearched = false
      state.errorMessage = action.payload
    },
    [fetchUserRepos.pending](state, action) {
      const user = getUser(action.meta.arg, state.items)
      user.areReposBeingFetched = true
      state.errorMessage = null
    },
    [fetchUserRepos.fulfilled](state, action) {
      const user = getUser(action.meta.arg, state.items)
      user.repos = action.payload.map(getFields(['id', 'name', 'description', 'stargazers_count', 'html_url']))
      user.areReposBeingFetched = false
      user.reposAlreadyFetched = true
    },
    [fetchUserRepos.rejected](state, action) {
      const user = getUser(action.meta.arg, state.items)
      user.areReposBeingFetched = false
      state.errorMessage = action.payload
    }
  }
})

export const { saveUsers, appendUsers, clearUsers, clearErrors, resetUsersStore } = usersSlice.actions
export default usersSlice.reducer
