import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import SingleUserPage from './components/SingleUserPage';
import UsersPage from './components/UsersPage';
import CoursesPage from './components/CoursesPage';
import SingleCoursePage from './components/SingleCoursePage';
import AdminPanel from './components/admin-components/AdminPanel';
import { getAllUsers } from './reducers/userReducer';

function App() {
	const dispatch = useDispatch();

	useEffect(
		() => {
			console.log('dispatching getAllUsers...');
			dispatch(getAllUsers());
		},
		[ dispatch ]
	);

	const users = useSelector(state => state.users);

	console.log(`users`, users);

	return (
		<div className='App'>
			<h1>Carna</h1>
			<div>
				<h2>Welcome, {'jake'}</h2>
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
						<CoursesPage />
					</Route>
					<Route path='/'>
						<AdminPanel />
					</Route>
				</Switch>
			</div>
		</div>
	);
}

export default App;
