import * as redux from 'redux';
import thunk from 'redux-thunk';

import auth from './auth/reducers';
import forms from './forms/reducers';

const reducers = redux.combineReducers({ auth, forms });

export default redux.createStore(reducers, redux.compose(
	redux.applyMiddleware(thunk),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));
