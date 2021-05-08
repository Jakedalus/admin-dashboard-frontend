import axios from 'axios';

const baseUrl = '/api/users';

const getAllUsers = async () => {
	const response = await axios.get(baseUrl);

	console.log(`response`, response);
	console.log(`response.data`, response.data);

	return response.data;
};

export default {
	getAllUsers
};
