import React from 'react';
import Course from './Course';
import styled from 'styled-components';

const StyledDiv = styled.div`
	display: flex;
	flex-direction: column;

	ul {
		display: flex;
		flex-direction: column;
		// align-items: center;
		padding: 0;
		width: 100%;
	}
`;

const CourseList = ({ courses, admin }) => {
	const Courses = courses.map(course => (
		<Course course={course} key={course.id} admin={admin} />
	));

	return (
		<StyledDiv>
			<h3>Upcoming Courses</h3>
			<ul>{Courses}</ul>
		</StyledDiv>
	);
};

export default CourseList;
