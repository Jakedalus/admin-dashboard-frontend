import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	width: 250px;
	top: 10%;
	left: calc(50% - 135px);
	padding: 10px;
	border-radius: 5px;
	color: white;

	${props =>
		props.type === 'error' &&
		`background-color: var(--red);
	`};

	${props =>
		props.type === 'success' &&
		`background-color: var(--green);
	`};
`;

const Notification = ({ notification }) => {
	console.log('notification', notification);
	const { message, type } = notification.notification;
	console.log('message, type', message, type);
	return (
		<StyledDiv
			className={
				type === 'error' ? (
					'notification error'
				) : (
					'notification success'
				)
			}
			type={type}
		>
			{message}
		</StyledDiv>
	);
};

export default Notification;
