import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

const StyledDiv = styled.div`height: 100vh;`;

const StyledUser = styled.div`
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

	button {
		margin-right: 20px;
	}

	ul {
		padding: 0;
	}

	li {
		list-style: none;
		margin-bottom: 10px;

		a {
			text-decoration: none;
			color: white;
			background-color: var(--green);
			padding: 5px;
			border-radius: 5px;
		}
	}

	label {
		margin-top: 5px;
	}
`;

const SingleUserPage = ({ user }) => {
	console.log(`user`, user);

	const [ courseLIs, setCourseLIs ] = useState([]);

	const history = useHistory();

	useEffect(
		() => {
			if (user && user.courses) {
				const Courses = user.courses.map(course => (
					<li key={course.id}>
						<Link to={`/courses/${course.id}`}>
							{course.title}
						</Link>
					</li>
				));

				setCourseLIs(Courses);
			}
		},
		[ user ]
	);

	return (
		<StyledDiv>
			{!user && <div>Loading...</div>}
			{user && (
				<div>
					<button onClick={() => history.goBack()}>
						{'<'} Back
					</button>
					<StyledUser>
						<h3>{user.username}</h3>
						<p>{user.name}</p>
						<p>{user.email}</p>
						<p>{user.createdAt}</p>
						{courseLIs.length !== 0 && <h4>Courses:</h4>}
						<ul>{courseLIs}</ul>
					</StyledUser>
				</div>
			)}
		</StyledDiv>
	);
};

export default SingleUserPage;
