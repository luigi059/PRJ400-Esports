import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

export default function SearchAPI() {
	const [players, setPlayers] = useState([]);
	const [search, setSearch] = useState('username[regex]=');

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
		const getPlayers = async () => {
			const token = localStorage.getItem('token');
			const res = await axios.get(
				`https://prj400-esports.onrender.com/api/search?${search}`,
				{
					headers: { Authorization: token },
				}
			);
			setPlayers(res.data.players);
		};
		getPlayers();
	}, [search]);

	return {
		players: [players, setPlayers],
		search: [search, setSearch],
	};
}
