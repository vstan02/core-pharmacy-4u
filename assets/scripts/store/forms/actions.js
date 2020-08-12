import { CLEAR_MESSAGE, SET_MESSAGE } from './types';

export function clearMessage() {
	return { type: CLEAR_MESSAGE };
}

export function setMessage(message) {
	return {
		type: SET_MESSAGE,
		payload: message
	};
}
