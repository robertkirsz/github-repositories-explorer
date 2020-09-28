import { combineReducers } from '@reduxjs/toolkit'
import 'isomorphic-fetch'
import users from 'reducers/users'

export default combineReducers({ users })
