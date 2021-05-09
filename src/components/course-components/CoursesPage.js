import React from 'react';
import CourseList from './CourseList';
import NewCourseForm from './NewCourseForm';

const CoursesPage = ({ courses }) => {
	console.log(`courses`, courses);

	return (
		<div>
			<h2>CoursesPage</h2>
			<NewCourseForm />
			<CourseList courses={courses} />
		</div>
	);
};

export default CoursesPage;
