import React from 'react';
import Course from './Course';

const CourseList = ({ courses, admin }) => {
	const Courses = courses.map(course => (
		<Course course={course} key={course.id} admin={admin} />
	));

	return (
		<div>
			<h2>CourseList</h2>
			<ul>{Courses}</ul>
		</div>
	);
};

export default CourseList;
