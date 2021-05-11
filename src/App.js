import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Switch,
	Route,
	useRouteMatch
} from 'react-router-dom';
import jwt from 'jsonwebtoken';
import SingleUserPage from './components/user-components/SingleUserPage';
import UsersPage from './components/user-components/UsersPage';
import CoursesPage from './components/course-components/CoursesPage';
import SingleCoursePage from './components/course-components/SingleCoursePage';
import AdminPanel from './components/admin-components/AdminPanel';
import Header from './components/Header';
import { getAllUsers } from './reducers/userReducer';
import { getAllCourses } from './reducers/courseReducer';
import { signin, signout } from './reducers/authReducer';
import SignInPage from './components/SignInPage';

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
			<h1>Carna</h1>
			{loading && <div>Loading...</div>}
			{!loading && !admin && <SignInPage />}
			{!loading &&
			admin && (
				<div>
					<Header />
					<h2>Welcome, {admin.username}</h2>
					<button onClick={() => dispatch(signout())}>
						Sign Out
					</button>
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
						<Route path='/'>
							<AdminPanel />
						</Route>
					</Switch>
				</div>
			)}
		</div>
	);
}

export default App;
