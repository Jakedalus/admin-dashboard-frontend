import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Switch,
	Route,
	useRouteMatch
} from 'react-router-dom';
import jwt from 'jsonwebtoken';
import styled, {
	createGlobalStyle
} from 'styled-components';
import SingleUserPage from './components/user-components/SingleUserPage';
import UsersPage from './components/user-components/UsersPage';
import CoursesPage from './components/course-components/CoursesPage';
import SingleCoursePage from './components/course-components/SingleCoursePage';
import AdminPanel from './components/admin-components/AdminPanel';
import Header from './components/Header';
import SidePanel from './components/admin-components/SidePanel';
import Profile from './components/Profile';
import { getAllUsers } from './reducers/userReducer';
import { getAllCourses } from './reducers/courseReducer';
import { signin } from './reducers/authReducer';
import SignInPage from './components/SignInPage';

const GlobalStyle = createGlobalStyle`

  :root {
    --lightblue: #e7f0ff;
    --blue: #1164fb;
    --darkblue: #2a3f54;

    --slate: #73879c;
    --darkslate: #596b7e;

    --green: #1abc9c;
    --darkgreen: #9abcc3;

    --gray: #c6d1e3;
    --lightgray: #ededed;
    --offwhite: #f7f7f7;

    --red: #e74c3c;
  }

  body {
    background-color: var(--offwhite);

    margin: 0;
    padding: 0;

    input {
      border: none;
      border-radius: 5px;
      height: 30px;
    }
    
    button {
      margin: 10px 0;
      border: none;
      border-radius: 5px;
      height: 30px;

      background-color: var(--darkslate);
      color: white;

      cursor: pointer;
    }

    button.primary {
      background-color: var(--blue);
    }

    button.delete {
      background-color: var(--red);
    }

    .ReactModal__Body--open {
      overflow-y: hidden;
    }
    
  }
`;

const ContainerDiv = styled.div`
	display: flex;
	align-items: stretch;
	align-content: stretch;
	height: 100%;
`;

const MainSectionDiv = styled.div`width: 100%;`;

const MainContentDiv = styled.div`padding: 20px;`;

function App() {
	const dispatch = useDispatch();

	const [ loading, setLoading ] = useState(true);

	useEffect(
		() => {
			console.log('dispatching getAllUsers...');
			dispatch(getAllUsers());
			dispatch(getAllCourses());
		},
		[ dispatch ]
	);

	useEffect(
		() => {
			const signedInUserJSON = window.localStorage.getItem(
				'signedInUser'
			);

			console.log(
				`window.localStorage`,
				window.localStorage
			);
			console.log(`signedInUserJSON`, signedInUserJSON);

			if (signedInUserJSON) {
				const user = JSON.parse(signedInUserJSON);

				const decodedToken = jwt.verify(
					user.token,
					process.env.REACT_APP_SECRET
				);

				console.log(`decodedToken`, decodedToken);

				dispatch(signin({ ...user, id: decodedToken.id }));
			}
			setLoading(false);
		},
		[ dispatch ]
	);

	const admin = useSelector(state => state.admin);
	const users = useSelector(state => state.users);
	const courses = useSelector(state => state.courses);

	console.log(`admin`, admin);
	console.log(`users`, users);
	console.log(`courses`, courses);

	const userMatch = useRouteMatch('/users/:id');
	const userPage = userMatch
		? users.find(user => user.id === userMatch.params.id)
		: null;

	const courseMatch = useRouteMatch('/courses/:id');
	const coursePage = courseMatch
		? courses.find(
				course => course.id === courseMatch.params.id
			)
		: null;

	// console.log(`coursePage`, coursePage);

	return (
		<div className='App'>
			<GlobalStyle />
			{loading && <div>Loading...</div>}
			{!loading && !admin && <SignInPage />}
			{!loading &&
			admin && (
				<ContainerDiv>
					<SidePanel admin={admin} />
					<MainSectionDiv>
						<Header admin={admin} />
						<MainContentDiv>
							<Switch>
								<Route path='/users/:id'>
									<SingleUserPage
										user={userPage}
										admin={admin}
									/>
								</Route>
								<Route path='/users'>
									<UsersPage admin={admin} users={users} />
								</Route>
								<Route path='/courses/:id'>
									<SingleCoursePage
										course={coursePage}
										admin={admin}
									/>
								</Route>
								<Route path='/courses'>
									<CoursesPage
										admin={admin}
										courses={courses}
									/>
								</Route>
								<Route path='/profile'>
									<Profile admin={admin} />
								</Route>
								<Route path='/'>
									<AdminPanel
										admin={admin}
										users={users}
										courses={courses}
									/>
								</Route>
							</Switch>
						</MainContentDiv>
					</MainSectionDiv>
				</ContainerDiv>
			)}
		</div>
	);
}

export default App;
