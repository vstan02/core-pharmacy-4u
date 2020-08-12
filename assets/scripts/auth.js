import store from './store';
import { login } from './store/auth/actions';

const form = document.getElementById('auth_form');

form.onsubmit = function (event) {
	event.preventDefault();
	store.dispatch(login({
		username: form['username'].value,
		password: form['password'].value
	}));
};

store.subscribe(() => {
	const { forms } = store.getState();
	const message = document.getElementById('auth_message');
	message.innerText = forms.message;
});
