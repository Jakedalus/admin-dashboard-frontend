import React from 'react';
import CourseList from './CourseList';
import NewCourseForm from './NewCourseForm';

const CoursesPage = ({ courses, admin }) => {
	console.log(`courses`, courses);

	return (
		<div>
			<h2>CoursesPage</h2>
			<NewCourseForm admin={admin} />
			<CourseList courses={courses} admin={admin} />
		</div>
	);
};

export default CoursesPage;
