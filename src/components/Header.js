import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
`;

const StyledUl = styled.ul`
	display: flex;
	justify-content: space-around;
	width: 150px;
	list-style: none;

	a {
		color: red;
	}
`;

const Header = () => {
	return (
		<StyledHeader>
			<div>Hamburger</div>
			<nav>
				<StyledUl>
					<li>Mail</li>
					<li>Profile</li>
				</StyledUl>
			</nav>
		</StyledHeader>
	);
};

export default Header;
