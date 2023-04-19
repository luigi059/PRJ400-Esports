import {
	ChatBubbleOutlineOutlined,
	DeleteOutlined,
	FavoriteBorderOutlined,
} from '@mui/icons-material';
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import profileImage from '../../images/miracle.jfif';
import FlexBetween from '../flexbetween';

const Post = ({
	postId,
	postUserId,
	username,
	name,
	description,
	picturePath,
	userPicturePath,
	likes,
	comments,
}) => {
	const theme = useTheme();
	const likeCount = Object.keys(likes).length;
	const main = theme.palette.secondary.main;
	const secondary = theme.palette.secondary[100];
	const token = localStorage.getItem('token');

	const handleDelete = () => {
		axios.delete(`http://localhost:5000/api/post/delete/${postId}`, {
			headers: { Authorization: token },
		});
		window.location.reload(false);
	};

	return (
		<Box
			sx={{
				margin: '2rem 0',
				padding: '1.5rem 1.5rem 0.75rem 1.5rem',
				backgroundColor: theme.palette.background.alt,
				borderRadius: '0.75rem',
			}}
		>
			<FlexBetween>
				<FlexBetween gap="1rem">
					<Box width="55px" height="55px">
						{/* WIP */}
						<img
							style={{ objectFit: 'cover', borderRadius: '50%' }}
							width="55px"
							height="55px"
							alt="user"
							src={profileImage}
						/>
					</Box>
					<Box>
						<Typography color={secondary} variant="h4" fontWeight="500">
							{username}
						</Typography>
						<Typography
							color={secondary}
							variant="h6"
							fontWeight="500"
							fontStyle="italic"
						>
							{name}
						</Typography>
					</Box>
				</FlexBetween>
				<DeleteOutlined
					onClick={() => handleDelete()}
					sx={{
						color: secondary,
						'&:hover': { cursor: 'pointer', color: main },
					}}
				/>
			</FlexBetween>
			<Divider sx={{ margin: '1.5rem 0' }} />
			<Typography color="white" sx={{ mt: '1rem' }}>
				{description}
			</Typography>
			{picturePath && (
				<img
					width="100%"
					height="auto"
					alt="post"
					style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
					src={picturePath}
				/>
			)}
			<Divider sx={{ margin: '1.5rem 0' }} />
			<FlexBetween mt="0.25rem">
				<FlexBetween gap="1rem">
					<FlexBetween gap="0.3rem">
						<IconButton>
							{/* WIP */}
							<FavoriteBorderOutlined sx={{ color: secondary }} />
						</IconButton>
						<Typography color={secondary}>{likeCount}</Typography>
					</FlexBetween>
					<FlexBetween gap="0.3rem">
						{/* WIP */}
						<IconButton>
							<ChatBubbleOutlineOutlined sx={{ color: secondary }} />
						</IconButton>
						<Typography color={secondary}>{comments.length}</Typography>
					</FlexBetween>
				</FlexBetween>
			</FlexBetween>
		</Box>
	);
};

export default Post;