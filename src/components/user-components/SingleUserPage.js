import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

const SingleUserPage = ({ user }) => {
	console.log(`user`, user);

	const [ courseLIs, setCourseLIs ] = useState(null);

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
		<div>
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
					<h4>Courses:</h4>
					<ul>{courseLIs}</ul>
				</div>
			)}
		</div>
	);
};

export default SingleUserPage;
