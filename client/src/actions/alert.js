import { SET_ALERT, REMOVE_ALERT } from './types';
import uuid from 'uuid';

export const setAlert = (msg, alertType, id, timeout = 5000) => (dispatch) => {
	if (id === undefined) id = uuid.v4();

	dispatch({
		type    : SET_ALERT,
		payload : { msg, alertType, id }
	});

	setTimeout(() => removeAlert(id), timeout);
};

export const removeAlert = (id) => (dispatch) => {
	dispatch({
		type    : REMOVE_ALERT,
		payload : id
	});
};
