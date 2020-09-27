import { combineReducers } from '@reduxjs/toolkit'
import 'isomorphic-fetch'
import usersReducer from 'reducers/users'

const rootReducer = combineReducers({ users: usersReducer })

export default rootReducer
