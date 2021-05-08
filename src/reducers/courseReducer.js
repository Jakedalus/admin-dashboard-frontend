import courseService from '../services/courses';

export const getAllCourses = () => {
	return async dispatch => {
		try {
			const courses = await courseService.getAllCourses();
			dispatch({ type: 'GET_ALL_COURSES', data: courses });
		} catch (exception) {
			console.log(`exception`, exception);
		}
	};
};

const reducer = (state = [], action) => {
	console.log('state now: ', state);
	console.log('action', action);

	switch (action.type) {
		case 'GET_ALL_COURSES':
			return action.data;
		default:
			return state;
	}
};

export default reducer;
