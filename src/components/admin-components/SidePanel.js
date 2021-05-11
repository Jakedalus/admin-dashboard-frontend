import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { signout } from '../../reducers/authReducer';

const StyledPanel = styled.header`
	display: flex;
	flex-direction: column;

	background: var(--darkblue);
	color: var(--lightgray);
	width: 20%;
	padding: 10px;
`;

const StyledUl = styled.ul`
	display: flex;
	flex-direction: column;
	list-style: none;
	a {
		color: var(--lightgray);
		text-decoration: none;
	}
`;

const SidePanel = ({ admin }) => {
	const dispatch = useDispatch();

	return (
		<StyledPanel>
			<h2>Welcome, {admin.username}</h2>
			<button onClick={() => dispatch(signout())}>
				Sign Out
			</button>
			<nav>
				<StyledUl>
					<Link to='/'>
						<li>Home</li>
					</Link>
					<Link to='/courses'>
						<li>Courses</li>
					</Link>
					<Link to='/users'>
						<li>Users</li>
					</Link>
				</StyledUl>
			</nav>
		</StyledPanel>
	);
};

export default SidePanel;
