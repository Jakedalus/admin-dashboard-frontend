import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TotalsPanel from './TotalsPanel';
import User from '../user-components/User';
import Course from '../course-components/Course';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const StyledAdmin = styled.main`height: 100%;`;

const StyledUl = styled.ul`
	display: flex;
	justify-content: space-around;
	padding: 0;
	width: 90%;

	li {
		width: 180px;
		overflow: hidden;
	}
`;

const AdminPanel = ({ admin, users, courses }) => {
	const Users = users
		.map(user => (
			<User user={user} key={user.id} admin={admin} />
		))
		.slice(0, 3);

	const Courses = courses
		.map(course => (
			<Course
				course={course}
				key={course.id}
				admin={admin}
			/>
		))
		.slice(0, 3);

	return (
		<StyledAdmin>
			<TotalsPanel
				admin={admin}
				users={users}
				courses={courses}
			/>
			<div>
				<div>
					<h3>Users</h3>
					<StyledUl>{Users}</StyledUl>
					<Link to={`/users/`}>
						See all <FontAwesomeIcon icon={faArrowRight} />
					</Link>
				</div>
				<div>
					<h3>Courses</h3>
					<StyledUl>{Courses}</StyledUl>
					<Link to={`/users/`}>
						See all <FontAwesomeIcon icon={faArrowRight} />
					</Link>
				</div>
			</div>
		</StyledAdmin>
	);
};

export default AdminPanel;
