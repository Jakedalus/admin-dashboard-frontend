import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { deleteCourse } from '../../reducers/courseReducer';
import CourseForm from './CourseForm';

const StyledDiv = styled.div`height: 100vh;`;

const StyledCourse = styled.div`
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

	h4 {
		margin: 0;
	}

	button {
		margin-right: 20px;
	}

	.questions {
		margin-top: 10px;
		padding: 0;

		li {
			list-style: none;
		}

		label {
			margin-top: 5px;
		}

		p {
			padding: 10px;
			border-radius: 5px;
			width: 40%;
		}

		li {
			display: flex;
			justify-content: space-between;
			align-items: center;

			span {
				margin-right: 10px;
				cursor: pointer;
			}
		}

		.question-and-answer {
			display: flex;
			justify-content: space-between;
			flex-grow: 1;
		}

		.question {
			background-color: white;
		}

		.answer {
			background-color: var(--blue);
			color: white;
		}
	}
`;

const SingleCoursePage = ({ course, admin }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	// const [ editMode, setEditMode ] = useState(false);

	const [
		courseFormIsOpen,
		setCourseFormIsOpen
	] = useState(false);

	if (course) {
		console.log(`admin`, admin);
		console.log(`course.user`, course.user);
		console.log(
			`admin.id === course.user.id `,
			admin.id === course.user.id
		);
	}

	const headers = {
		headers : { Authorization: `bearer ${admin.token}` }
	};

	const handleDeleteCourse = id => {
		dispatch(deleteCourse(id, headers));
		history.goBack();
	};

	return (
		<StyledDiv>
			{!course && <div>Loading...</div>}
			{course && (
				<div>
					<button onClick={() => history.goBack()}>
						{'<'} Back
					</button>

					<StyledCourse>
						<h3>{course.title}</h3>
						<p>{course.teacher}</p>
						<p>{course.subject}</p>
						<p>{course.createdAt}</p>
						<p>{course.updatedAt}</p>
						<ul className='questions'>
							{course.questions.map(q => (
								<li
									className='question-and-answer'
									key={q._id}
								>
									<p className='question'>{q.question}</p>
									<p className='answer'>{q.answer}</p>
								</li>
							))}
						</ul>
						{admin.id === course.user.id && (
							<button
								onClick={() => {
									// setEditMode(false);
									setCourseFormIsOpen(true);
								}}
							>
								Edit
							</button>
						)}
						{admin.id === course.user.id && (
							<button
								className='delete'
								onClick={() =>
									handleDeleteCourse(course.id)}
							>
								Delete
							</button>
						)}
					</StyledCourse>

					<div>
						<CourseForm
							courseFormIsOpen={courseFormIsOpen}
							setCourseFormIsOpen={setCourseFormIsOpen}
							// setEditMode={setEditMode}
							course={course}
							admin={admin}
						/>
						{/* <button onClick={() => setEditMode(false)}>
							Cancel
						</button> */}
					</div>
				</div>
			)}
		</StyledDiv>
	);
};

export default SingleCoursePage;
