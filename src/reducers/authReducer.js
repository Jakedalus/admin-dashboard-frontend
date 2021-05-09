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
	return async dispatch => {
		try {
			const user = await authService.sigin(credentials);

			window.localStorage.setItem(
				'signedInUser',
				JSON.stringify(user)
			);

			const decodedToken = jwt.verify(
				user.token,
				process.env.SECRET
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
