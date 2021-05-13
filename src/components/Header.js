import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { signout } from '../reducers/authReducer';

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
		margin-left: 5px;
	}
`;

const ProfileDiv = styled.div`cursor: pointer;`;

const Menu = styled.ul`
	position: absolute;
	right: 10%;
	padding: 0;
	background-color: var(--gray);
	border-radius: 5px;

	transform: scaleY(0);
	transform-origin: top;

	transition: transform .2s ease-in-out;

	li {
		list-style: none;
		padding: 5px;
		cursor: pointer;
	}

	li:hover {
		background-color: var(--darkslate);
		color: white;
		border-radius: 5px;
	}

	li:hover a {
		color: white;
	}
`;

const Header = ({ admin }) => {
	console.log(`admin`, admin);

	const [ showMenu, setShowMenu ] = useState(false);

	const dispatch = useDispatch();

	return (
		<StyledHeader>
			<div>Hamburger</div>
			<nav>
				<StyledUl>
					<li>
						<ProfileDiv
							onClick={() => setShowMenu(!showMenu)}
						>
							<span>{admin.name}</span>
							<FontAwesomeIcon icon={faAngleDown} />
						</ProfileDiv>

						<Menu
							style={
								showMenu ? (
									{ transform: 'scaleY(1)' }
								) : (
									{ transform: 'scaleY(0)' }
								)
							}
						>
							<li>
								<Link to='/profile'>Profile</Link>
							</li>
							<li onClick={() => dispatch(signout())}>
								Sign Out
							</li>
						</Menu>
					</li>
				</StyledUl>
			</nav>
		</StyledHeader>
	);
};

export default Header;
