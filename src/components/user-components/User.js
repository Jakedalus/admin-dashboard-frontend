import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLi = styled.li`
	position: relative;
	background-color: var(--lightblue);
	padding: 20px;
	margin-bottom: 30px;
	width: 35%;
	border-radius: 10px;
	list-style: none;

	div div {
		margin-bottom: 40px;
	}

	h4 {
		margin: 0;
	}

	a {
		position: absolute;
		right: 10px;
		bottom: 20px;
		color: var(--blue);
		text-decoration: none;
		font-size: 12px;

		span {
			color: white;
			background-color: var(--blue);
			padding: 10px;
			border-radius: 50%;
			margin-left: 10px;
		}
	}
`;

const User = ({ user }) => {
	console.log(`user`, user);

	return (
		<StyledLi>
			<div>
				<div>
					<h4>{user.username}</h4>
					<p>{user.name}</p>
					<p>{user.email}</p>
				</div>
				<Link to={`/users/${user.id}`}>
					View Detail <span>{'->'}</span>
				</Link>
			</div>
		</StyledLi>
	);
};

export default User;
