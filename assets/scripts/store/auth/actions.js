import axios from 'axios';

import { isSuccess, isInvalid } from '@/utils/status';
import { setMessage, clearMessage } from '../forms/actions';
import { CLEAR_TOKEN, SET_TOKEN } from './types';

export function clearToken() {
	sessionStorage.removeItem('token');
	return { type: CLEAR_TOKEN };
}

export function setToken(token) {
	sessionStorage.setItem('token', token);

	return {
		type: SET_TOKEN,
		payload: token
	};
}

export function login(user) {
	return dispatch => {
		dispatch(clearMessage());
		axios.post('/api/auth', user)
		 	.then(response => {
				const { status, token, details } = response.data;

				if (isSuccess(status)) {
					dispatch(setToken(token));
				} else if (isInvalid(status)) {
					dispatch(clearToken());
					dispatch(setMessage(details + '!'));
				}
			});
	};
}
