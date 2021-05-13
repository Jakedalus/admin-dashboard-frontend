import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { changePassword } from '../reducers/authReducer';

const StyledDiv = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;

	label {
		font-size: 10px;
		color: var(--slate);
	}

	p {
		margin: 0;
		margin-bottom: 10px;
		padding: 5px;
		border: 2px solid var(--slate);
		border-radius: 5px;
		width: max-content;
		min-width: 150px;
	}

	button {
		width: 160px;
	}
`;

const ModalContainer = styled.div`
	display: flex;
	flex-direction: column;

	input {
		border-bottom: 1px solid var(--slate);
		border-radius: 0;
	}

	input:focus {
		border-bottom: 1px solid black;
		transition: border-bottom .2s ease-in-out;
	}

	label {
		display: flex;
		flex-direction: column;
		margin-top: 40px;
		color: var(--slate);
	}

	label:focus-within {
		color: black;

		transition: color .2s ease-in-out;
	}

	button.change {
		background-color: var(--royalblue);
	}

	.svg-inline--fa.fa-arrow-left {
		cursor: pointer;
	}
`;

const Profile = ({ admin }) => {
	console.log(`admin`, admin);

	const dispatch = useDispatch();

	const [ pwModalIsOpen, setPwModalIsOpen ] = useState(
		false
	);

	const [ error, setError ] = useState(false);

	const [ oldPw, setOldPw ] = useState('');
	const [ newPw, setNewPw ] = useState('');
	const [ confirmPw, setConfirmPw ] = useState('');

	const handleUpdatePassword = async e => {
		e.preventDefault();

		if (newPw === confirmPw) {
			const response = await dispatch(
				changePassword({
					username    : admin.username,
					password    : oldPw,
					newPassword : newPw
				})
			);

			console.log(`response`, response);

			if (Number(response) === 200) {
				setPwModalIsOpen(false);
				setOldPw('');
				setNewPw('');
				setConfirmPw('');
			} else {
				console.log(`error!`);
				setError(true);
			}
		}
	};

	const customStyles = {
		content : {
			top             : '50%',
			left            : '50%',
			right           : 'auto',
			bottom          : 'auto',
			marginRight     : '-50%',
			transform       : 'translate(-50%, -50%)',
			backgroundColor : 'white',
			overflowY       : 'auto',
			maxHeight       : '100vh'
		}
	};

	return (
		<StyledDiv>
			<h2>My Account</h2>
			<label>Username</label>
			<p>{admin.username}</p>

			<label>Name</label>
			<p>{admin.name}</p>

			<label>Email</label>
			<p>{admin.email}</p>

			<button onClick={() => setPwModalIsOpen(true)}>
				Change Password
			</button>

			<Modal
				isOpen={pwModalIsOpen}
				onRequestClose={() => setPwModalIsOpen(false)}
				style={customStyles}
				shouldCloseOnOverlayClick={false}
				contentLabel='Example Modal'
			>
				<ModalContainer>
					<p
						onClick={() => {
							setOldPw('');
							setNewPw('');
							setConfirmPw('');
							setPwModalIsOpen(false);
						}}
					>
						<FontAwesomeIcon icon={faArrowLeft} />
					</p>
					<h3>Change password</h3>

					<label htmlFor='old'>
						Old password
						<input
							name='old'
							id='old'
							type='password'
							value={oldPw}
							onChange={e => setOldPw(e.target.value)}
						/>
					</label>

					<label htmlFor='new'>
						New password
						<input
							name='new'
							id='new'
							type='password'
							value={newPw}
							onChange={e => setNewPw(e.target.value)}
						/>
					</label>

					<label htmlFor='confirm'>
						Confirm new password
						<input
							name='confirm'
							id='confirm'
							type='password'
							value={confirmPw}
							onChange={e => setConfirmPw(e.target.value)}
						/>
					</label>
					<button
						className='change'
						onClick={handleUpdatePassword}
					>
						Update Password
					</button>
					{error && <p>Something went wrong</p>}
				</ModalContainer>
			</Modal>
		</StyledDiv>
	);
};

export default Profile;
