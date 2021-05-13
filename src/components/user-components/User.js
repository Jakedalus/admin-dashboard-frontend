import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

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
		display: flex;
		align-items: center;
		position: absolute;
		right: 10px;
		bottom: 20px;
		color: var(--blue);
		text-decoration: none;
		font-size: 12px;

		.svg-inline--fa.fa-arrow-right {
			color: white;
			background-color: var(--blue);
			padding: 10px;
			line-height: 50px;
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
					<p>Created {user.courses.length} courses</p>
				</div>
				<Link to={`/users/${user.id}`}>
					View Detail{' '}
					<FontAwesomeIcon icon={faArrowRight} />
				</Link>
			</div>
		</StyledLi>
	);
};

export default User;
