import { createStore, applyMiddleware } from 'redux';
// import filmReducer from './reducers/filmReducer'
import reducer from './reducers/reducer'
import thunk from 'redux-thunk'; //redux middleware permettant de propager des actions async

/*****************************************************************
 * 
 * Création du Store
 * 
**************************************************************** */

const Store = createStore(reducer, applyMiddleware(thunk));
export default Store