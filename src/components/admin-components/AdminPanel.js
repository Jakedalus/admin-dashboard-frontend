import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TotalsPanel from './TotalsPanel';
import User from '../user-components/User';
import Course from '../course-components/Course';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const StyledAdmin = styled.main`height: 100%;`;

const ListContainer = styled.div`
	position: relative;
	width: 90%;
`;

const StyledUl = styled.ul`
	display: flex;
	// justify-content: start;
	position: relative;
	padding: 0;

	li {
		width: 180px;
		overflow: hidden;
		margin-right: 10px;
	}
`;

const StyledLink = styled(Link)`
  position: absolute;
  right: 0px;
  bottom: 0px;
  color: var(--blue);
  text-decoration: none;
  font-size: 16px;
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
				<ListContainer>
					<h3>Users</h3>
					<StyledUl>{Users}</StyledUl>
					{users.length > 3 && (
						<StyledLink to={`/users/`}>
							See all{' '}
							<FontAwesomeIcon icon={faArrowRight} />
						</StyledLink>
					)}
				</ListContainer>
				<ListContainer>
					<h3>Courses</h3>
					<StyledUl>{Courses}</StyledUl>
					{courses.length > 3 && (
						<StyledLink to={`/users/`}>
							See all{' '}
							<FontAwesomeIcon icon={faArrowRight} />
						</StyledLink>
					)}
				</ListContainer>
			</div>
		</StyledAdmin>
	);
};

export default AdminPanel;
