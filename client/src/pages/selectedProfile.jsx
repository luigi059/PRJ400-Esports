import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function SelectedProfile() {
	const params = useParams();

	useEffect(() => {
		console.log(params);
	}, [params]);

	return <div>selectedprofile</div>;
}

export default SelectedProfile;
