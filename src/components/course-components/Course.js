import React from 'react';

const Course = ({ course }) => {
	return (
		<li>
			<h3>{course.title}</h3>
		</li>
	);
};

export default Course;
