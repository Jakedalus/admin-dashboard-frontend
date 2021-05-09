import React from 'react';
import CourseList from './CourseList';

const CoursesPage = ({ courses }) => {
	console.log(`courses`, courses);

	return (
		<div>
			<h2>CoursesPage</h2>
			<CourseList courses={courses} />
		</div>
	);
};

export default CoursesPage;
