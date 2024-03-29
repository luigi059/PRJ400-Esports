import React, { createContext, useEffect, useState } from 'react';
import SearchAPI from './api/search';
import UserAPI from './api/user';

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
	const [token, setToken] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			setToken(token);
		}
	}, [token]);

	const state = {
		token: [token, setToken],
		userApi: UserAPI(token),
		searchAPI: SearchAPI(),
	};

	return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
