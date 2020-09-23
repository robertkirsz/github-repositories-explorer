import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    saveUsers: (state, action) => action.payload,
    appendUsers: (state, action) => [...state, ...action.payload]
  }
})

export const { saveUsers, appendUsers } = usersSlice.actions
export default usersSlice.reducer
