import React, { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '../components';
import { GlobalState } from '../GlobalState';
import { Dashboard, Home, Review, SignIn, SignUp } from '../pages';

function Pages() {
	const state = useContext(GlobalState);
	const [isLogged] = state.userApi.isLogged;

	useEffect(() => {
		console.log(isLogged);
	}, [isLogged]);

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/signin" element={<SignIn />} />
			<Route path="/signup" element={<SignUp />} />
			<Route element={isLogged ? <Layout /> : <SignIn />}>
				<Route path="/profile" element={<Dashboard />} />
				<Route path="/reviews" element={<Review />} />
			</Route>
		</Routes>
	);
}

export default Pages;
