import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '../components';
import {
	Dashboard,
	Feed,
	Home,
	Inbox,
	Invite,
	Review,
	Schedule,
	Search,
	SelectedProfile,
	SignIn,
	SignUp,
	Team,
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
				<Route path="/team" element={<Team />} />
				<Route path="/inbox" element={<Inbox />} />
				<Route path="/feed" element={<Feed />} />
				<Route path="/schedule" element={<Schedule />} />
				<Route path="/invites" element={<Invite />} />
			</Route>
		</Routes>
	);
}

export default Pages;
