import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import styled from 'styled-components';
import {
	createNewCourse,
	updateCourse
} from '../../reducers/courseReducer';

const StyledDiv = styled.div`
	background-color: var(--lightblue);
	width: 300px;
`;

const FormHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;

	label {
		display: flex;
		flex-direction: column;
		margin 5px 0;

		ul {
			margin: 0;
		}
	}

	.questions {
		margin-top: 10px;

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

    ul {
      padding: 0;
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

	input {
		border: none;
		border-radius: 5px;
		height: 30px;
	}
  
  button {
    margin: 10px 0;
  }
`;

const CourseForm = ({
	course,
	// setEditMode,
	admin,
	courseFormIsOpen,
	setCourseFormIsOpen
}) => {
	console.log(`course`, course);

	useEffect(
		() => {
			if (courseFormIsOpen)
				document.body.style.overflow = 'hidden';
			else if (!courseFormIsOpen)
				document.body.style.overflow = 'unset';
		},
		[ courseFormIsOpen ]
	);

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
			top             : '50%',
			left            : '50%',
			right           : 'auto',
			bottom          : 'auto',
			marginRight     : '-50%',
			transform       : 'translate(-50%, -50%)',
			backgroundColor : 'var(--lightblue)',
			overflowY       : 'auto',
			maxHeight       : '100vh'
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
			<StyledDiv>
				<FormHeader>
					<h2>{course ? 'Edit Course' : 'New Course'}</h2>
					<button
						onClick={() => setCourseFormIsOpen(false)}
					>
						Cancel
					</button>
				</FormHeader>
				<StyledForm>
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

					<label className='questions'>
						<b>Add Questions</b>
						<ul>
							{questions.map((q, i) => (
								<li key={q.id}>
									<span
										onClick={e =>
											handleRemoveQuestion(e, i)}
									>
										×
									</span>
									<div className='question-and-answer'>
										<p className='question'>{q.question}</p>
										<p className='answer'>{q.answer}</p>
									</div>
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

					<button
						className='primary'
						onClick={handleSaveCourse}
					>
						Save Course
					</button>
				</StyledForm>
			</StyledDiv>
		</Modal>
	);
};

export default CourseForm;
