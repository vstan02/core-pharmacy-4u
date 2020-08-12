import { combineReducers } from 'redux';

import { SET_TOKEN, CLEAR_TOKEN } from './types';

function token(state = '', action) {
	switch (action.type) {
		case SET_TOKEN:
			return action.payload;
		case CLEAR_TOKEN:
			return '';
		default:
			return state;
	}
}

export default combineReducers({ token });
