import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const StyledDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;

	font-size: 40px;
`;

const Loading = () => {
	return (
		<StyledDiv>
			<FontAwesomeIcon icon={faSpinner} spin />
		</StyledDiv>
	);
};

export default Loading;
