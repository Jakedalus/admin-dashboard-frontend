import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const StyledHeader = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	background-color: var(--gray);
`;

const StyledUl = styled.ul`
	display: flex;
	justify-content: space-around;
	position: relative;
	width: 150px;
	list-style: none;

	li a {
		text-decoration: none;
		color: black;
	}
	.svg-inline--fa.fa-angle-down {
		font-size: 12px;
	}
`;

const Menu = styled.ul`
	position: absolute;
	right: 10%;
	padding: 0;
	background-color: var(--gray);
	border-radius: 5px;

	li {
		list-style: none;
		padding: 5px;
	}
`;

const Header = ({ admin }) => {
	console.log(`admin`, admin);

	const [ showMenu, setShowMenu ] = useState(false);

	return (
		<StyledHeader>
			<div>Hamburger</div>
			<nav>
				<StyledUl>
					<li>
						<div onClick={() => setShowMenu(!showMenu)}>
							<span>{admin.name}</span>
							<FontAwesomeIcon icon={faAngleDown} />
						</div>
						{showMenu && (
							<Menu>
								<li>
									<Link to='/profile'>Profile</Link>
								</li>
								<li>Sign Out</li>
							</Menu>
						)}
					</li>
				</StyledUl>
			</nav>
		</StyledHeader>
	);
};

export default Header;
