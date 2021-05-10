import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import SingleUserPage from './components/user-components/SingleUserPage';
import UsersPage from './components/user-components/UsersPage';
import CoursesPage from './components/course-components/CoursesPage';
import SingleCoursePage from './components/course-components/SingleCoursePage';
import AdminPanel from './components/admin-components/AdminPanel';
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

				dispatch(signin({ ...user, id: decodedToken }));
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

	return (
		<div className='App'>
			<h1>Carna</h1>
			{loading && <div>Loading...</div>}
			{!loading && !admin && <SignInPage />}
			{!loading &&
			admin && (
				<div>
					<h2>Welcome, {admin.username}</h2>
					<button onClick={() => dispatch(signout())}>
						Sign Out
					</button>
					<Switch>
						<Route path='/users/:id'>
							<SingleUserPage />
						</Route>
						<Route path='/users'>
							<UsersPage />
						</Route>
						<Route path='/courses/:id'>
							<SingleCoursePage />
						</Route>
						<Route path='/courses'>
							<CoursesPage courses={courses} />
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
