import store from './store/index'
import { addArticle } from './actions/index'

window.store = store
store.dispatch(addArticle({ name: 'React Redux Tutorial for Beginners', id: 1 }))
window.addArticle = addArticle
