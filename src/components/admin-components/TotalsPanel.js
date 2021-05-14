import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`display: flex;`;

const StyledTotalDiv = styled.div`
	margin-right: 20px;
	padding-right: 20px;
	border-right: 2px solid var(--darkslate);
	color: var(--darkslate);

	p {
		margin: 0;
		padding: 0;
	}

	p:last-child {
		font-size: 30px;
		font-weight: bold;
	}
`;

const TotalsPanel = ({ users, courses }) => {
	console.log(`users`, users);
	console.log(`courses`, courses);

	return (
		<StyledDiv>
			<StyledTotalDiv>
				<p>Total Users</p>
				<p>{users.length}</p>
			</StyledTotalDiv>
			<StyledTotalDiv>
				<p> Total Courses</p>
				<p>{courses.length}</p>
			</StyledTotalDiv>
		</StyledDiv>
	);
};

export default TotalsPanel;
