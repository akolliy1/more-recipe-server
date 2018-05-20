import App from './components/App'
import index from './redux/index'

console.log(`I'm a silly entry point`)

const arr = [1, 2, 3]
const iAmJavascriptES6 = () => console.log(...arr)
window.iAmJavascriptES6 = iAmJavascriptES6
