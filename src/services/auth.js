import axios from 'axios';

const baseUrl = '/api/auth';

const signin = async credentials => {
	const response = await axios.post(
		`${baseUrl}/signin`,
		credentials
	);

	return response.data;
};

export default { signin };
