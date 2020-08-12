import { combineReducers } from 'redux';

import { SET_MESSAGE, CLEAR_MESSAGE } from './types';

function message(state = '', action) {
	switch (action.type) {
		case SET_MESSAGE:
			return action.payload;
		case CLEAR_MESSAGE:
			return '';
		default:
			return state;
	}
}

export default combineReducers({ message });
