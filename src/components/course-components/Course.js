import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteCourse } from '../../reducers/courseReducer';

const Course = ({ course, admin }) => {
	const dispatch = useDispatch();

	const handleDeleteCourse = id => {
		const headers = {
			headers : { Authorization: `bearer ${admin.token}` }
		};

		dispatch(deleteCourse(id, headers));
	};

	return (
		<li>
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
				<button
					onClick={() => handleDeleteCourse(course.id)}
				>
					Delete
				</button>
			)}
		</li>
	);
};

export default Course;
