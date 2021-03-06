import jwt from 'jsonwebtoken';
import authService from '../services/auth';
import { setNotification } from './notificationReducer';

export const signin = user => {
	return dispatch => {
		dispatch({
			type : 'SIGNIN',
			data : user
		});
	};
};

export const signout = () => {
	window.localStorage.clear();

	return dispatch => {
		dispatch({ type: 'SIGNOUT' });
	};
};

export const signinUser = credentials => {
	console.log('signinUser, credentials', credentials);
	return async dispatch => {
		console.log('signinUser, dispatch');
		try {
			console.log('signinUser, try block');

			const user = await authService.signin(credentials);

			console.log(`user`, user);

			window.localStorage.setItem(
				'signedInUser',
				JSON.stringify(user)
			);

			const decodedToken = jwt.verify(
				user.token,
				process.env.REACT_APP_SECRET
			);

			dispatch(signin({ ...user, id: decodedToken.id }));
		} catch (exception) {
			console.log(`exception`, exception);
			dispatch(
				setNotification(
					{
						message : 'Wrong credentials',
						type    : 'error'
					},
					5000
				)
			);
		}
	};
};

export const signupUser = credentials => {
	return async dispatch => {
		try {
			const user = await authService.signup(credentials);

			console.log(`user`, user);

			window.localStorage.setItem(
				'signedInUser',
				JSON.stringify(user)
			);

			const decodedToken = jwt.verify(
				user.token,
				process.env.REACT_APP_SECRET
			);

			dispatch(signin({ ...user, id: decodedToken.id }));
		} catch (exception) {
			console.log(`exception`, exception);
			dispatch(
				setNotification(
					{
						message : 'Wrong credentials',
						type    : 'error'
					},
					5000
				)
			);
		}
	};
};

export const changePassword = credentials => {
	console.log(`credentials`, credentials);
	return async dispatch => {
		try {
			const responseStatus = await authService.changePassword(
				credentials
			);

			console.log(`responseStatus`, responseStatus);

			dispatch(
				setNotification(
					{
						message : 'Sucessfully changed password',
						type    : 'success'
					},
					5000
				)
			);

			return responseStatus;
		} catch (exception) {
			console.log(`exception`, exception);
			dispatch(
				setNotification(
					{
						message : 'Wrong credentials',
						type    : 'error'
					},
					5000
				)
			);

			return exception;
		}
	};
};

const reducer = (state = null, action) => {
	console.log('state now: ', state);
	console.log('action', action);

	switch (action.type) {
		case 'SIGNIN':
			return action.data;
		case 'SIGNOUT':
			return null;
		default:
			return state;
	}
};

export default reducer;
