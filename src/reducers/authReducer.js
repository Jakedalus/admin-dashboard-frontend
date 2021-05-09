import jwt from 'jsonwebtoken';
import authService from '../services/auth';

export const signin = user => {
	return dispatch => {
		dispatch({
			type : 'SIGNIN',
			data : user
		});
	};
};

export const signout = () => {
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

			console.log(`process.env`, process.env);

			const decodedToken = jwt.verify(
				user.token,
				process.env.REACT_APP_SECRET
			);

			dispatch(signin({ ...user, id: decodedToken.id }));
		} catch (exception) {
			console.log(`exception`, exception);
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
