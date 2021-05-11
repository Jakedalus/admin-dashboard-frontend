import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteCourse } from '../../reducers/courseReducer';
import CourseForm from './CourseForm';

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
	};

	return (
		<li>
			{!course && <div>Loading...</div>}
			{course && (
				<div>
					<button onClick={() => history.goBack()}>
						{'<'} Back
					</button>

					<div>
						<h3>{course.title}</h3>
						<p>{course.teacher}</p>
						<p>{course.subject}</p>
						<p>{course.createdAt}</p>
						<p>{course.updatedAt}</p>
						<ul>
							{course.questions.map(q => (
								<li key={q._id}>
									<p>Question: {q.question}</p>
									<p>Answer: {q.answer}</p>
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
								onClick={() =>
									handleDeleteCourse(course.id)}
							>
								Delete
							</button>
						)}
					</div>

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
		</li>
	);
};

export default SingleCoursePage;
