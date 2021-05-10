import React from 'react';

const Course = ({ course }) => {
	return (
		<li>
			<h3>{course.title}</h3>
			<p>{course.teacher}</p>
			<p>{course.subject}</p>
			<ul>
				{course.questions.map(q => (
					<li>
						<p>Question: {q.question}</p>
						<p>Answer: {q.answer}</p>
					</li>
				))}
			</ul>
		</li>
	);
};

export default Course;
