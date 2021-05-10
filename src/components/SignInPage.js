import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	signinUser,
	signupUser
} from '../reducers/authReducer';

const SignInPage = () => {
	const history = useHistory();

	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ confirm, setConfirm ] = useState('');
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');

	const [ signUp, setSignUp ] = useState(false);

	const dispatch = useDispatch();

	const handleSignin = e => {
		e.preventDefault();

		console.log(`username`, username);
		console.log(`password`, password);

		dispatch(signinUser({ username, password }));
		history.push('/');
	};

	const handleSignup = e => {
		e.preventDefault();

		if (password === confirm) {
			dispatch(
				signupUser({ username, password, name, email })
			);
			history.push('/');
		} else {
			console.log('passwords must match!');
		}
	};

	return (
		<div>
			{!signUp && (
				<div>
					<h2>Sign In!</h2>
					<form>
						<label>
							Username
							<input
								type='text'
								name='username'
								value={username}
								onChange={e => setUsername(e.target.value)}
							/>
						</label>
						<label>
							Password
							<input
								type='password'
								name='password'
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
						</label>
						<button onClick={handleSignin}>Sign In</button>
					</form>
					<p onClick={() => setSignUp(true)}>
						Create a new account
					</p>
				</div>
			)}
			{signUp && (
				<div>
					<h2>Sign Up!</h2>
					<form>
						<label>
							Username
							<input
								type='text'
								name='username'
								value={username}
								onChange={e => setUsername(e.target.value)}
							/>
						</label>
						<label>
							Password
							<input
								type='password'
								name='password'
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
						</label>
						<label>
							Confirm Password
							<input
								type='password'
								name='confirm'
								value={confirm}
								onChange={e => setConfirm(e.target.value)}
							/>
						</label>
						<label>
							Name
							<input
								type='text'
								name='name'
								value={name}
								onChange={e => setName(e.target.value)}
							/>
						</label>
						<label>
							Email
							<input
								type='email'
								name='email'
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
						</label>
						<button onClick={handleSignup}>Sign Up</button>
					</form>
					<p onClick={() => setSignUp(false)}>
						Sign in to your account
					</p>
				</div>
			)}
		</div>
	);
};

export default SignInPage;
