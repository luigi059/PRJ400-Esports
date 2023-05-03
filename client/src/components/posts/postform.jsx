import {
	DeleteOutlined,
	EditOutlined,
	ImageOutlined,
} from '@mui/icons-material';
import {
	Box,
	Button,
	Divider,
	IconButton,
	InputBase,
	Typography,
	useTheme,
} from '@mui/material';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import Dropzone from 'react-dropzone';
import { GlobalState } from '../../GlobalState';
import { Loading } from '../../components';
import FlexBetween from '../flexbetween';

const PostForm = () => {
	const theme = useTheme();
	const state = useContext(GlobalState);
	const [isImage, setIsImage] = useState(false);
	const [image, setImage] = useState(null);
	const [post, setPost] = useState('');
	const [user] = state.userApi.user;
	const mediumMain = theme.palette.secondary[100];
	const medium = theme.palette.secondary.main;
	const token = localStorage.getItem('token');
	const [isLoading, setIsLoading] = useState(false);

	const handlePost = async () => {
		const formData = new FormData();
		formData.append('userId', user.userInfo.user._id);
		formData.append('username', user.userInfo.user.username);
		formData.append('name', user.userInfo.user.name);
		formData.append('description', post);
		if (image) {
			formData.append('file', image);
		}
		setIsLoading(true);
		const response = await axios.post(
			'http://localhost:5000/api/post/create',
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: token,
				},
			}
		);
		if (response) window.location.reload(false);
	};

	return (
		<Box
			sx={{
				padding: '1.5rem 1.5rem 0.75rem 1.5rem',
				backgroundColor: theme.palette.background.alt,
				borderRadius: '0.75rem',
			}}
		>
			{isLoading && <Loading />}
			{!isLoading && (
				<Box>
					<InputBase
						placeholder="What's on your mind..."
						onChange={(e) => setPost(e.target.value)}
						value={post}
						sx={{
							width: '100%',
							color: 'white',
							backgroundColor: theme.palette.primary[600],
							borderRadius: '2rem',
							padding: '1rem 2rem',
						}}
					/>
					{isImage && (
						<Box
							border={`1px solid ${medium}`}
							borderRadius="5px"
							mt="1rem"
							p="1rem"
						>
							<Dropzone
								acceptedFiles=".jpg,.jpeg,.png"
								multiple={false}
								onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
							>
								{({ getRootProps, getInputProps }) => (
									<FlexBetween>
										<Box
											{...getRootProps()}
											border={`2px dashed ${theme.palette.primary.main}`}
											p="1rem"
											width="100%"
											sx={{ '&:hover': { cursor: 'pointer' } }}
										>
											<input {...getInputProps()} />
											{!image ? (
												<Typography color="white">Add Image Here</Typography>
											) : (
												<FlexBetween>
													<Typography color="white">{image.name}</Typography>
													<EditOutlined sx={{ color: mediumMain }} />
												</FlexBetween>
											)}
										</Box>
										{image && (
											<IconButton
												onClick={() => setImage(null)}
												sx={{ width: '15%' }}
											>
												<DeleteOutlined sx={{ color: mediumMain }} />
											</IconButton>
										)}
									</FlexBetween>
								)}
							</Dropzone>
						</Box>
					)}
					<Divider sx={{ margin: '1.5rem 0' }} />
					<FlexBetween>
						<FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
							<ImageOutlined sx={{ color: mediumMain }} />
							<Typography
								color={mediumMain}
								sx={{ '&:hover': { cursor: 'pointer', color: medium } }}
							>
								Image
							</Typography>
						</FlexBetween>

						<Button
							disabled={!post}
							onClick={handlePost}
							sx={{
								color: 'white',
								backgroundColor: theme.palette.secondary.main,
								borderRadius: '3rem',
							}}
						>
							POST
						</Button>
					</FlexBetween>
				</Box>
			)}
		</Box>
	);
};

export default PostForm;
