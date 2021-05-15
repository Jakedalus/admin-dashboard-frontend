import courseService from '../services/courses';
import { setNotification } from './notificationReducer';

// action creators for courses
export const getAllCourses = () => {
	return async dispatch => {
		try {
			const courses = await courseService.getAllCourses();
			dispatch({ type: 'GET_ALL_COURSES', data: courses });
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

export const createNewCourse = (data, config) => {
	console.log(`data`, data);
	console.log(`config`, config);
	return async dispatch => {
		try {
			const newCourse = await courseService.createNewCourse(
				data,
				config
			);

			console.log(`newCourse`, newCourse);

			dispatch({ type: 'NEW_COURSE', data: newCourse });
			dispatch(
				setNotification(
					{
						message : `Created new course: ${data.title}`,
						type    : 'success'
					},
					5000
				)
			);
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

export const updateCourse = (id, updates, config) => {
	return async dispatch => {
		try {
			const updatedCourse = await courseService.updateCourse(
				id,
				updates,
				config
			);

			dispatch({
				type : 'UPDATE_COURSE',
				data : updatedCourse
			});
			dispatch(
				setNotification(
					{
						message : `Updated course`,
						type    : 'success'
					},
					5000
				)
			);
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

export const deleteCourse = (id, config) => {
	console.log(`deleteCourse: id, config`, id, config);
	return async dispatch => {
		try {
			const deletedCourse = await courseService.deleteCourse(
				id,
				config
			);

			dispatch({
				type : 'DELETE_COURSE',
				data : deletedCourse
			});
			dispatch(
				setNotification(
					{
						message : `Deleted course`,
						type    : 'success'
					},
					5000
				)
			);
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
		case 'GET_ALL_COURSES':
			return action.data;
		case 'NEW_COURSE':
			return [ ...state, { ...action.data } ];
		case 'UPDATE_COURSE':
			return state.map(
				course =>
					course.id === action.data.id
						? { ...action.data }
						: course
			);
		case 'DELETE_COURSE':
			return state.filter(
				course => course.id !== action.data.id
			);
		default:
			return state;
	}
};

export default reducer;
