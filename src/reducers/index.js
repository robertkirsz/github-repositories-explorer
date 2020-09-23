import { combineReducers } from '@reduxjs/toolkit'

import usersReducer from 'reducers/users'

const rootReducer = combineReducers({ users: usersReducer })

export default rootReducer
