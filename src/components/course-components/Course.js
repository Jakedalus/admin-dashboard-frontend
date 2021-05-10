import React from 'react';

import { Link } from 'react-router-dom';

const Course = ({ course }) => {
	console.log(`course.user`, course.user);

	return (
		<li>
			<div>
				<Link to={`/courses/${course.id}`}>
					<h3>{course.title}</h3>
				</Link>
				<p>{course.teacher}</p>
				<p>{course.subject}</p>
			</div>
		</li>
	);
};

export default Course;
