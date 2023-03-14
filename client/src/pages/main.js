import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '../components';
import {
	Dashboard,
	Home,
	Review,
	Search,
	SelectedProfile,
	SignIn,
	SignUp,
} from '../pages';

function Pages() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/signin" element={<SignIn />} />
			<Route path="/signup" element={<SignUp />} />
			<Route element={<Layout />}>
				<Route path="/profile" element={<Dashboard />} />
				<Route path="/reviews" element={<Review />} />
				<Route path="/search" element={<Search />} />
				<Route path="/profile/:id" element={<SelectedProfile />} />
			</Route>
		</Routes>
	);
}

export default Pages;
