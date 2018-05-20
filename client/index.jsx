import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './redux/reducers'
import App from './components/App'

const store = createStore(rootReducer)
// render(<App />, document.getElementById('app'));
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
