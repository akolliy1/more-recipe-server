import 'babel-polyfill'
import React from 'react'
// import { render } from 'react-dom'
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './redux/reducers'
import App from './components/App'
import index from './redux/index'
const store = createStore(rootReducer)
// render(<App />, document.getElementById('app'));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
