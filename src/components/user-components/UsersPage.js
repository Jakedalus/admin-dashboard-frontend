import React from 'react';
import UserList from './UserList';

const UsersPage = ({ users, admin }) => {
	console.log(`users`, users);

	return (
		<div>
			<h2>UsersPage</h2>
			<UserList users={users} admin={admin} />
		</div>
	);
};

export default UsersPage;
