import axios from 'axios';

const baseUrl = '/api/auth';

const signin = async credentials => {
	console.log('signin, credentials', credentials);

	const response = await axios.post(
		`${baseUrl}/signin`,
		credentials
	);

	console.log(`response.data`, response.data);

	return response.data;
};

const signup = async credentials => {
	console.log('signup, credentials', credentials);

	const response = await axios.post(
		`${baseUrl}/signup`,
		credentials
	);

	console.log(`response.data`, response.data);

	return response.data;
};

const changePassword = async credentials => {
	const response = await axios.put(
		`${baseUrl}/changepassword`,
		credentials
	);

	console.log(`response.status`, response.status);
	console.log(`response.error`, response.error);

	return response.status;
};

export default { signin, signup, changePassword };
