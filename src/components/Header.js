import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<div>
			<nav>
				<ul>
					<Link to='/'>
						<li>Home</li>
					</Link>
					<Link to='/courses'>
						<li>Courses</li>
					</Link>
					<Link to='/users'>
						<li>Users</li>
					</Link>
				</ul>
			</nav>
		</div>
	);
};

export default Header;
