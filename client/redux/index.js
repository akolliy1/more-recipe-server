import store from './store/index'
import { addArticle } from './actions/index'

window.store = store
store.subscribe(() => console.log('Look ma, Redux!!'))
store.dispatch(addArticle({ name: 'React Redux Tutorial for Beginners', id: 1 }))
store.subscribe(() => console.log('Look ma, Rex!!'))
store.dispatch(addArticle({ name: 'React Redux for Beginners', id: 2 }))

window.addArticle = addArticle
