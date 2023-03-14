import axios from 'axios';
import { useEffect, useState } from 'react';

export default function UserAPI(token) {
	const [isLogged, setIsLogged] = useState(false);
	const [user, setUser] = useState({});

	useEffect(() => {
		if (token) {
			const getUser = async () => {
				try {
					const res = await axios.get(
						'http://localhost:5000/api/user/info/none',
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
			getUser();
		}
	}, [token]);

	const updateUserData = (newValues) => {
		setUser({
			...user,
			...newValues,
		});
	};

	return {
		isLogged: [isLogged, setIsLogged],
		user: [user, setUser],
	};
}
