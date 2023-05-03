import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Rating,
	Select,
	Typography,
	useTheme,
} from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../GlobalState';
import { FlexBetween, Title } from '../components';

function Review() {
	const theme = useTheme();
	const state = useContext(GlobalState);
	const [user] = state.userApi.user;
	const [reviews, setReviews] = useState([]);
	const [ownReview, setownReview] = useState(false);
	const token = localStorage.getItem('token');

	const getReviews = async () => {
		if (!ownReview) {
			try {
				const res = await axios.get(
					`http://localhost:5000/api/review/get_reviews/${user.userInfo.user._id}`
				);
				setReviews(res.data);
			} catch (err) {
				alert(err.response.data.msg);
			}
		} else {
			try {
				const res = await axios.get(
					'http://localhost:5000/api/review/my_reviews',
					{
						headers: { Authorization: token },
					}
				);
				setReviews(res.data);
			} catch (err) {
				alert(err.response.data.msg);
			}
		}
	};

	useEffect(() => {
		getReviews();
	}, [ownReview]);

	const handleChange = (event) => {
		setownReview(event.target.value);
	};

	return (
		<Box m="1.5rem 2.5rem">
			<FlexBetween>
				{ownReview ? (
					<Title title="REVIEWS" subtitle="Your Own Reviews" />
				) : (
					<Title title="REVIEWS" subtitle="Reviews From Other Players" />
				)}
				<Box
					sx={{
						minWidth: 120,
					}}
				>
					<FormControl fullWidth sx={{ color: theme.palette.neutral[0] }}>
						<InputLabel
							id="demo-simple-select-label"
							sx={{ color: theme.palette.neutral[0], fontSize: '10px' }}
						>
							Page
						</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={ownReview}
							label="Age"
							onChange={handleChange}
							sx={{
								color: theme.palette.neutral[0],
							}}
						>
							<MenuItem value={false}>Reviews From Other Players</MenuItem>
							<MenuItem value={true}>Own Reviews</MenuItem>
						</Select>
					</FormControl>
				</Box>
			</FlexBetween>
			{reviews.map((review) => {
				return (
					<Box
						marginTop="1rem"
						backgroundColor={theme.palette.background.alt}
						p="1.5rem"
						borderRadius="0.55rem"
					>
						<FlexBetween>
							<Typography
								marginBottom="1rem"
								variant="h6"
								sx={{ color: theme.palette.neutral[0] }}
							>
								Reviewing: {review.revieweeName}
							</Typography>
						</FlexBetween>
						<FlexBetween>
							<Box>
								<Typography
									variant="h5"
									sx={{ color: theme.palette.neutral[0] }}
								>
									Leadership
								</Typography>
								<Rating name="read-only" value={review.leadership} readOnly />
							</Box>
							<Box>
								<Typography
									variant="h5"
									sx={{ color: theme.palette.neutral[0] }}
								>
									Drafting
								</Typography>
								<Rating name="read-only" value={review.drafting} readOnly />
							</Box>
							<Box>
								<Typography
									variant="h5"
									sx={{ color: theme.palette.neutral[0] }}
								>
									Knowledge
								</Typography>
								<Rating name="read-only" value={review.knowledge} readOnly />
							</Box>
							<Box>
								<Typography
									variant="h5"
									sx={{ color: theme.palette.neutral[0] }}
								>
									Versatility
								</Typography>
								<Rating name="read-only" value={review.versatility} readOnly />
							</Box>
							<Box>
								<Typography
									variant="h5"
									sx={{ color: theme.palette.neutral[0] }}
								>
									Technical
								</Typography>
								<Rating name="read-only" value={review.technical} readOnly />
							</Box>
							<Box>
								<Typography
									variant="h5"
									sx={{ color: theme.palette.neutral[0] }}
								>
									Farming
								</Typography>
								<Rating name="read-only" value={review.farming} readOnly />
							</Box>
						</FlexBetween>
						<Box
							marginTop="1rem"
							backgroundColor={theme.palette.background.alt}
						>
							<Typography variant="h5" sx={{ color: theme.palette.neutral[0] }}>
								{review.content}
							</Typography>
							{!ownReview && (
								<Typography
									marginTop="1rem"
									variant="h6"
									sx={{ color: theme.palette.neutral[0] }}
								>
									By: {review.reviewer}
								</Typography>
							)}
						</Box>
					</Box>
				);
			})}
		</Box>
	);
}

export default Review;
