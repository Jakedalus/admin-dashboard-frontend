import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signinUser } from '../reducers/authReducer';

const SignInPage = () => {
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');

	const dispatch = useDispatch();

	const handleSignin = e => {
		e.preventDefault();

		console.log(`username`, username);
		console.log(`password`, password);

		dispatch(signinUser({ username, password }));
	};

	return (
		<div>
			<h2>SignInPage</h2>
			<form>
				<input
					type='text'
					name='username'
					value={username}
					onChange={e => setUsername(e.target.value)}
				/>
				<input
					type='password'
					name='password'
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<button onClick={handleSignin}>Sign In</button>
			</form>
		</div>
	);
};

export default SignInPage;
