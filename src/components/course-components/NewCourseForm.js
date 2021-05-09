import React, { useState } from 'react';
import { createNewCourse } from '../../reducers/courseReducer';

const NewCourseForm = () => {
	const [ title, setTitle ] = useState('');
	const [ teacher, setTeacher ] = useState('');
	const [ subject, setSubject ] = useState('');

	const handleSaveCourse = e => {
		e.preventDefault();
	};

	return (
		<div>
			<h2>NewCourseForm</h2>
			<form>
				<label>
					Course Title
					<input
						name='title'
						type='text'
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
				</label>
				<label>
					Course Teacher
					<input
						name='teacher'
						type='text'
						value={teacher}
						onChange={e => setTeacher(e.target.value)}
					/>
				</label>
				<label>
					Course Subject
					<input
						name='subject'
						type='text'
						value={subject}
						onChange={e => setSubject(e.target.value)}
					/>
				</label>
				<button onClick={handleSaveCourse}>
					Save Course
				</button>
			</form>
		</div>
	);
};

export default NewCourseForm;
