import { SET_ALERT, REMOVE_ALERT } from './types';
import uuid from 'uuid';

export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
	const id = uuid.v4();
	dispatch({
		type    : SET_ALERT,
		payload : { msg, alertType, id }
	});

	setTimeout(
		() =>
			dispatch({
				type    : REMOVE_ALERT,
				payload : id
			}),
		timeout
	);
};

export const toRemove = () => {
	return {
		type : SET_ALERT
	};
};

// export const addTodo = () => ({ type: 'ADD_TODO' });
export const addTodo = (msg) => {
	return {
		type : 'ADD_TODO',
		msg
	};
};
