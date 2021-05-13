import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {
	signinUser,
	signupUser
} from '../reducers/authReducer';

const StyledDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 300px;
	margin: 0 auto;

	span {
		color: var(--purple);
		cursor: pointer;
	}
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;

	label {
		width: 100%;
	}

	input {
		width: 100%;
		margin-bottom: 30px;
	}

	button {
		background-color: var(--purple);
		width: 100%;
	}
`;

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
				<StyledDiv>
					<h2>Welcome Back :)</h2>
					<StyledForm>
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
					</StyledForm>
					<p>
						Don't have an account?{' '}
						<span onClick={() => setSignUp(true)}>
							Create a new one
						</span>
					</p>
				</StyledDiv>
			)}
			{signUp && (
				<StyledDiv>
					<h2>Create an Account</h2>
					<StyledForm>
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
						<button onClick={handleSignup}>Sign Up</button>
					</StyledForm>
					<p>
						Already have an account?{' '}
						<span onClick={() => setSignUp(false)}>
							Login
						</span>
					</p>
				</StyledDiv>
			)}
		</div>
	);
};

export default SignInPage;
