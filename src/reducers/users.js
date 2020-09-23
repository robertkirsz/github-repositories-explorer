import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from 'api'

// Get only selected fields so that we don't pollute the store with data we're not interested in
const prepareUsers = users =>
  users.map(({ id, login, avatar_url, repos_url }) => ({ id, login, avatar_url, repos_url }))

export const fetchUsers = createAsyncThunk('fetchUsers', async (username, page) => await api.fetchUsers(username, page))

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    currentPage: 1,
    pending: false
  },
  reducers: {},
  extraReducers: {
    [fetchUsers.pending]: state => {
      state.pending = true
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.items = prepareUsers(action.payload.items)
      state.pending = false
    },
    [fetchUsers.rejected]: (state, action) => {
      console.error('💥 Oh no, something went wrong!')
      console.error(`${action.error.name}: ${action.error.message}`)
      state.pending = false
    }
  }
})

export const { saveUsers, appendUsers } = usersSlice.actions
export default usersSlice.reducer
