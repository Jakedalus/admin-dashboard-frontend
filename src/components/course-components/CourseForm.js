import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import {
	createNewCourse,
	updateCourse
} from '../../reducers/courseReducer';

const CourseForm = ({
	course,
	// setEditMode,
	admin,
	courseFormIsOpen,
	setCourseFormIsOpen
}) => {
	console.log(`course`, course);

	const [ title, setTitle ] = useState(
		course ? course.title : ''
	);
	const [ teacher, setTeacher ] = useState(
		course ? course.teacher : ''
	);
	const [ subject, setSubject ] = useState(
		course ? course.subject : ''
	);
	const [ question, setQuestion ] = useState('');
	const [ answer, setAnswer ] = useState('');
	const [ questions, setQuestions ] = useState(
		course ? course.questions : []
	);

	console.log(`title`, title);
	console.log(`teacher`, teacher);

	const dispatch = useDispatch();

	const handleSaveCourse = e => {
		e.preventDefault();

		const headers = {
			headers : { Authorization: `bearer ${admin.token}` }
		};

		if (!course) {
			dispatch(
				createNewCourse(
					{ title, teacher, subject, questions },
					headers
				)
			);
		} else {
			dispatch(
				updateCourse(
					course.id,
					{ title, teacher, subject, questions },
					headers
				)
			);
			// setEditMode(false);
		}

		if (!course) {
			setTitle('');
			setTeacher('');
			setSubject('');
			setQuestions([]);
		}

		setCourseFormIsOpen(false);
	};

	const handleRemoveQuestion = (e, i) => {
		console.log(`i`, i);
		const newQs = questions.filter((question, index) => {
			console.log(`index`, index);
			return index !== i;
		});

		console.log(`newQs`, newQs);

		setQuestions(newQs);
	};

	const customStyles = {
		content : {
			top         : '50%',
			left        : '50%',
			right       : 'auto',
			bottom      : 'auto',
			marginRight : '-50%',
			transform   : 'translate(-50%, -50%)'
		}
	};

	return (
		<Modal
			isOpen={courseFormIsOpen}
			onRequestClose={() => setCourseFormIsOpen(false)}
			style={customStyles}
			shouldCloseOnOverlayClick={false}
			contentLabel='Example Modal'
		>
			<h2>NewCourseForm</h2>
			<button onClick={() => setCourseFormIsOpen(false)}>
				Cancel
			</button>
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
						{questions.map((q, i) => (
							<li>
								<span
									onClick={e => handleRemoveQuestion(e, i)}
								>
									x
								</span>
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
		</Modal>
	);
};

export default CourseForm;
