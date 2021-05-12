import React from 'react';
import User from './User';
import styled from 'styled-components';

const StyledDiv = styled.div`
	display: flex;
	flex-direction: column;

	ul {
		display: flex;
		flex-direction: column;
		// align-items: center;
		padding: 0;
		width: 100%;
	}
`;

const UserList = ({ users, admin }) => {
	const Users = users.map(user => (
		<User user={user} key={user.id} admin={admin} />
	));

	return (
		<StyledDiv>
			<ul>{Users}</ul>
		</StyledDiv>
	);
};

export default UserList;
