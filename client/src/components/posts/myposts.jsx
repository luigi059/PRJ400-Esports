import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../../GlobalState';
import { Loading } from '../../components';
import Post from './post';

const MyPosts = () => {
	const state = useContext(GlobalState);
	const [user] = state.userApi.user;
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (user.userInfo) {
			setIsLoading(false);
		}
	}, [user]); // eslint-disable-line react-hooks/exhaustive-deps

	return isLoading ? (
		<Loading />
	) : (
		<>
			{user.userInfo.posts.map(
				({
					_id,
					userId,
					username,
					name,
					description,
					picturePath,
					userPicturePath,
					likes,
					comments,
				}) => (
					<Post
						key={_id}
						postId={_id}
						postUserId={userId}
						username={username}
						name={name}
						description={description}
						picturePath={picturePath}
						userPicturePath={userPicturePath}
						likes={likes}
						comments={comments}
					/>
				)
			)}
		</>
	);
};

export default MyPosts;
