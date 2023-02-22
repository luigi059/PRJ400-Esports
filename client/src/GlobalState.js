import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import UserAPI from './api/user';

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
	const [token, setToken] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			console.log(token);
			setToken(token);
		}
	}, []);

	const state = {
		token: [token, setToken],
		userApi: UserAPI(token),
	};

	return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
