import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewCourse } from '../../reducers/courseReducer';

const NewCourseForm = ({ admin }) => {
	const [ title, setTitle ] = useState('');
	const [ teacher, setTeacher ] = useState('');
	const [ subject, setSubject ] = useState('');
	const [ question, setQuestion ] = useState('');
	const [ answer, setAnswer ] = useState('');
	const [ questions, setQuestions ] = useState([]);

	const dispatch = useDispatch();

	const handleSaveCourse = e => {
		e.preventDefault();

		const headers = {
			headers : { Authorization: `bearer ${admin.token}` }
		};

		dispatch(
			createNewCourse(
				{ title, teacher, subject, questions },
				headers
			)
		);

		setTitle('');
		setTeacher('');
		setSubject('');
		setQuestions([]);
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

				<label>
					Questions
					<ul>
						{questions.map(q => (
							<li>
								<p>Q: {q.question}</p>
								<p>A: {q.answer}</p>
							</li>
						))}
					</ul>
					<label>
						Question:
						<input
							name='question'
							type='text'
							value={question}
							onChange={e => setQuestion(e.target.value)}
						/>
					</label>
					<label>
						Answer:
						<input
							name='answer'
							type='text'
							value={answer}
							onChange={e => setAnswer(e.target.value)}
						/>
					</label>
					<button
						type='button'
						onClick={() => {
							setQuestions([
								...questions,
								{ question, answer }
							]);
							setQuestion('');
							setAnswer('');
						}}
					>
						Add Questions
					</button>
				</label>

				<button onClick={handleSaveCourse}>
					Save Course
				</button>
			</form>
		</div>
	);
};

export default NewCourseForm;
