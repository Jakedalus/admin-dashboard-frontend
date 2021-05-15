import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	width: 250px;
	top: 80%;
	left: calc(50% - 135px);
	background-color: var(--red);
	color: white;
	padding: 10px;
	border-radius: 5px;
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
		>
			{message}
		</StyledDiv>
	);
};

export default Notification;
