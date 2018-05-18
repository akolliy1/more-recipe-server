import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
// import { Provider } from 'react-redux'
// import { createStore } from 'redux'
// import rootReducer from './src/reducers'
import App from './components/App'
import index from './src/index'

// const store = createStore(rootReducer)
render(<App />, document.getElementById('root'));
// render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('app')
// )
