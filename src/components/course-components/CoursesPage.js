import React, { useState } from 'react';
import CourseList from './CourseList';
import CourseForm from './CourseForm';

const CoursesPage = ({ courses, admin }) => {
	console.log(`courses`, courses);

	const [
		courseFormIsOpen,
		setCourseFormIsOpen
	] = useState(false);

	return (
		<div>
			<h2>CoursesPage</h2>
			<button onClick={() => setCourseFormIsOpen(true)}>
				Create a new course
			</button>
			<CourseForm
				admin={admin}
				courseFormIsOpen={courseFormIsOpen}
				setCourseFormIsOpen={setCourseFormIsOpen}
			/>
			<CourseList courses={courses} admin={admin} />
		</div>
	);
};

export default CoursesPage;
