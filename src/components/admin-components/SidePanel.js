import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledPanel = styled.header`
	display: flex;
	flex-direction: column;

	background: var(--darkblue);
	color: var(--lightgray);
	width: 20%;
	height: 110vh;
	padding: 10px;

	transform: translateX(
		${props => (props.showSidePanel ? '0%' : '-90%')}
	);

	transition: transform .2s ease-in-out;
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

const SidePanel = ({ admin, showSidePanel }) => {
	console.log(`admin`, admin);

	return (
		<StyledPanel showSidePanel={showSidePanel}>
			<h2>Welcome, {admin.username}</h2>
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
