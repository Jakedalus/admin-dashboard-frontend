import React from 'react';
import User from './User';

const UserList = ({ users, admin }) => {
	const Users = users.map(user => (
		<User user={user} key={user.id} admin={admin} />
	));

	return (
		<div>
			<h2>UserList</h2>
			<ul>{Users}</ul>
		</div>
	);
};

export default UserList;
