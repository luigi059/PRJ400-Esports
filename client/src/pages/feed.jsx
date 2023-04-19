import { Box, useMediaQuery } from '@mui/material';
import React from 'react';
import { MyPosts, PostForm } from '../components';

function Feed() {
	const isNonMobileScreens = useMediaQuery('(min-width:1000px)');

	return (
		<Box>
			<Box
				width="100%"
				padding="2rem 6%"
				display={isNonMobileScreens ? 'flex' : 'block'}
				gap="0.5rem"
				justifyContent="center"
			>
				<Box
					flexBasis={isNonMobileScreens ? '70%' : undefined}
					mt={isNonMobileScreens ? undefined : '2rem'}
				>
					<PostForm />
					<MyPosts />
				</Box>
			</Box>
		</Box>
	);
}

export default Feed;
