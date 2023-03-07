import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

export default function SearchAPI() {
	const [players, setPlayers] = useState([]);
	const [search, setSearch] = useState('');

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
		const getProducts = async () => {
			const res = await axios.get(
				`http://localhost:5000/api/search/minisearch?username[regex]=${search}`
			);
			console.log(res.data);
		};
		getProducts();
	}, [search]);

	return {
		players: [players, setPlayers],
		search: [search, setSearch],
	};
}
