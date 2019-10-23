import { addTodo, setAlert, removeAlert } from './alert';
import { SET_ALERT, REMOVE_ALERT } from './types';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import uuid from 'uuid';

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

// Create initial state and store
let initialState = {};
let store = mockStore(initialState);

describe('Action: alert', () => {
	afterEach(() => {
		// Reset store
		store = mockStore(initialState);
	});

	it('dispatches setAlert', () => {
		// Payload
		const msg = 'Test passed';
		const alertType = 'success';
		const id = uuid.v4();

		// Get actions
		store.dispatch(setAlert(msg, alertType, id));

		// Test if your store dispatched the expected actions
		const actions = store.getActions();
		const expectedPayload = {
			type    : SET_ALERT,
			payload : { msg, alertType, id }
		};
		expect(actions).toEqual([ expectedPayload ]);
	});

	it('dispatches removeAlert', () => {
		const id = uuid.v4();

		// Dispatch the action
		store.dispatch(removeAlert(id));

		// Test if your store dispatched the expected actions
		const actions = store.getActions();
		const expectedPayload = { type: REMOVE_ALERT, payload: id };
		expect(actions).toEqual([ expectedPayload ]);
	});
});
