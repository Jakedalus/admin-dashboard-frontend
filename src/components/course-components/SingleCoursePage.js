import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCourse } from '../../reducers/courseReducer';
import CourseForm from './CourseForm';

const SingleCoursePage = ({ course, admin }) => {
	const dispatch = useDispatch();

	const [ editMode, setEditMode ] = useState(false);

	console.log(`admin`, admin);
	console.log(`course.user`, course.user);
	console.log(
		`admin.id === course.user.id `,
		admin.id === course.user.id
	);

	const headers = {
		headers : { Authorization: `bearer ${admin.token}` }
	};

	const handleDeleteCourse = id => {
		dispatch(deleteCourse(id, headers));
	};

	return (
		<li>
			{!editMode && (
				<div>
					<h3>{course.title}</h3>
					<p>{course.teacher}</p>
					<p>{course.subject}</p>
					<ul>
						{course.questions.map(q => (
							<li key={q._id}>
								<p>Question: {q.question}</p>
								<p>Answer: {q.answer}</p>
							</li>
						))}
					</ul>
					{admin.id === course.user.id && (
						<button onClick={() => setEditMode(true)}>
							Edit
						</button>
					)}
					{admin.id === course.user.id && (
						<button
							onClick={() => handleDeleteCourse(course.id)}
						>
							Delete
						</button>
					)}
				</div>
			)}
			{editMode && (
				<div>
					<CourseForm
						setEditMode={setEditMode}
						course={course}
						admin={admin}
					/>
					<button onClick={() => setEditMode(false)}>
						Cancel
					</button>
				</div>
			)}
		</li>
	);
};

export default SingleCoursePage;
