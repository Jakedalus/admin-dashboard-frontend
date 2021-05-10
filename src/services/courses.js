/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const baseUrl = '/api/courses';

const getAllCourses = async () => {
	const response = await axios.get(baseUrl);

	return response.data;
};

const createNewCourse = async (course, config) => {
	const response = await axios.post(
		baseUrl,
		course,
		config
	);

	return response.data;
};

const updateCourse = async (id, updates, config) => {
	const response = await axios.put(
		`${baseUrl}/${id}`,
		updates,
		config
	);

	return response.data;
};

const deleteCourse = async (id, config) => {
	console.log(`deleteCourse: id, config`, id, config);
	const response = await axios.delete(
		`${baseUrl}/${id}`,
		config
	);

	return response.data;
};

export default {
	getAllCourses,
	createNewCourse,
	updateCourse,
	deleteCourse
};
