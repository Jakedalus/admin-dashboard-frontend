import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLi = styled.li`
	position: relative;
	background-color: var(--lightblue);
	padding: 20px;
	margin-bottom: 30px;
	width: 35%;
	border-radius: 10px;
	list-style: none;

	div div {
		margin-bottom: 40px;
	}

	h3 {
		margin: 0;
	}

	a {
		position: absolute;
		right: 10px;
		bottom: 20px;
		color: var(--blue);
		text-decoration: none;
		font-size: 12px;

		span {
			color: white;
			background-color: var(--blue);
			padding: 10px;
			border-radius: 50%;
			margin-left: 10px;
		}
	}
`;

const Course = ({ course }) => {
	console.log(`course.user`, course.user);

	return (
		<StyledLi>
			<div>
				<div>
					<h4>{course.title}</h4>
					<p>{course.teacher}</p>
					<p>{course.subject}</p>
				</div>
				<Link to={`/courses/${course.id}`}>
					View Detail <span>{'->'}</span>
				</Link>
			</div>
		</StyledLi>
	);
};

export default Course;
