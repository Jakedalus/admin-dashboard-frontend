import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

const StyledDiv = styled.div`height: 100vh;`;

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
					<h3>{user.username}</h3>
					<p>{user.name}</p>
					<p>{user.email}</p>
					<p>{user.createdAt}</p>
					{courseLIs.length !== 0 && <h4>Courses:</h4>}
					<ul>{courseLIs}</ul>
				</div>
			)}
		</StyledDiv>
	);
};

export default SingleUserPage;
