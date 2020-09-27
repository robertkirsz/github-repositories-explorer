import { configureStore } from '@reduxjs/toolkit'
import rootReducers from 'reducers'

const store = configureStore({ reducer: rootReducers })

// Reuse the store if any reducer is recompiled during hot-reloading
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('reducers', () => {
    const newRootReducer = require('reducers').default
    store.replaceReducer(newRootReducer)
  })
}

export default store
