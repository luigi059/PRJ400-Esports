import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

export default function UserAPI(token) {
	const [isLogged, setIsLogged] = useState(false);
	const [refreshData, setRefreshData] = useState(false);
	const [user, setUser] = useState({});

	useEffect(() => {
		if (token) {
			getUser();
		}
	}, [token]);

	const useDidMountEffect = (func, deps) => {
		const didMount = useRef(false);
		useEffect(() => {
			if (didMount.current) {
				func();
			} else {
				didMount.current = true;
			}
		}, deps);
	};

	useDidMountEffect(() => {
		getUser();
	}, [refreshData]);

	const getUser = async () => {
		try {
			const res = await axios.get(
				'https://prj400-esports.onrender.com/api/user/info/none',
				{
					headers: { Authorization: token },
				}
			);
			updateUserData(res.data);
			setIsLogged(true);
		} catch (err) {
			alert(err.response.data.msg);
		}
	};

	const updateUserData = (newValues) => {
		setUser({
			...user,
			...newValues,
		});
	};

	return {
		isLogged: [isLogged, setIsLogged],
		refreshData: [refreshData, setRefreshData],
		user: [user, setUser],
	};
}
