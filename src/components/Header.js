import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { signout } from '../reducers/authReducer';

const Hamburger = styled.div`
	margin-left: 10px;
	color: var(--darkslate);
	cursor: pointer;
`;

const StyledHeader = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	background-color: var(--lightgray);
	color: var(--darkslate);

	transform: translateX(
			${props => (props.showSidePanel ? '0%' : '-10%')}
		)
		scaleX(
			${props => (props.showSidePanel ? '100%' : '120%')}
		);

	transition: transform .2s ease-in-out;
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

const ProfileDiv = styled.div`
	cursor: pointer;
	transform: scaleX(
		${props => (props.showSidePanel ? '100%' : '85%')}
	);
	transition: transform .2s ease-in-out;
`;

const Menu = styled.ul`
	position: absolute;
	right: 10%;
	padding: 0;
	background-color: var(--lightgray);
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

const Header = ({
	admin,
	showSidePanel,
	setShowSidePanel
}) => {
	console.log(`admin`, admin);

	console.log(`showSidePanel`, showSidePanel);

	const [ showMenu, setShowMenu ] = useState(false);

	const dispatch = useDispatch();

	return (
		<StyledHeader showSidePanel={showSidePanel}>
			<Hamburger>
				<FontAwesomeIcon
					icon={faBars}
					onClick={() => setShowSidePanel(!showSidePanel)}
				/>
			</Hamburger>
			<nav>
				<StyledUl>
					<li>
						<ProfileDiv
							showSidePanel={showSidePanel}
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
