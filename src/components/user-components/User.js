import React from 'react';
import { Link } from 'react-router-dom';

const User = ({ user }) => {
	console.log(`user`, user);

	return (
		<li>
			<div>
				<Link to={`/users/${user.id}`}>
					<h3>{user.username}</h3>
				</Link>
				<p>{user.name}</p>
				<p>{user.email}</p>
			</div>
		</li>
	);
};

export default User;
