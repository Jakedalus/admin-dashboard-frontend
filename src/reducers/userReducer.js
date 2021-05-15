import userService from '../services/users';
import { setNotification } from './notificationReducer';

export const getAllUsers = () => {
	return async dispatch => {
		try {
			const users = await userService.getAllUsers();

			dispatch({ type: 'GET_ALL_USERS', data: users });
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

const reducer = (state = [], action) => {
	console.log('state now: ', state);
	console.log('action', action);

	switch (action.type) {
		case 'GET_ALL_USERS':
			return action.data;
		default:
			return state;
	}
};

export default reducer;
