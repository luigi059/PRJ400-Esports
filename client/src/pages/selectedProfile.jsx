import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Menu,
	MenuItem,
	Rating,
	Stack,
	TextField,
	Typography,
	useTheme,
} from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FlexBetween, Loading, SmallBox, Title } from '../components';
import { GlobalState } from '../GlobalState';

function SelectedProfile() {
	const theme = useTheme();
	const params = useParams();
	const state = useContext(GlobalState);
	const [user] = state.userApi.user;
	const [player, setPlayer] = useState({});
	const [reviews, setReviews] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [openReview, setOpenReview] = React.useState(false);
	const [leadership, setLeadership] = React.useState(0);
	const [drafting, setDrafting] = React.useState(0);
	const [knowledge, setKnowledge] = React.useState(0);
	const [versatility, setVersatility] = React.useState(0);
	const [technical, setTechnical] = React.useState(0);
	const [farming, setFarming] = React.useState(0);
	const [reviewContent, setReviewContent] = React.useState(null);
	const [page, setPage] = useState('main');
	const token = localStorage.getItem('token');

	const getInfo = async () => {
		try {
			const res = await axios.get(
				`http://localhost:5000/api/user/info/${params.id}`,
				{
					headers: { Authorization: token },
				}
			);
			setPlayer(res.data.userInfo);
		} catch (err) {
			alert(err.response.data.msg);
		}
	};

	const getReviews = async () => {
		try {
			const res = await axios.get(
				`http://localhost:5000/api/review/get_reviews/${params.id}`
			);
			setReviews(res.data);
		} catch (err) {
			alert(err.response.data.msg);
		}
	};

	useEffect(() => {
		getInfo();
		getReviews();
	}, []);
	useEffect(() => {
		setIsLoading(true);
		if (player.user && reviews) {
			setIsLoading(false);
		}
	}, [player, reviews]);

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const goToMain = () => {
		setPage('main');
		setAnchorEl(null);
	};
	const goToReview = () => {
		setPage('review');
		setAnchorEl(null);
	};

	const createReview = () => {
		setOpenReview(true);
	};
	const closeReview = () => {
		setOpenReview(false);
	};
	const submitReview = () => {
		const newReview = {
			reviewee: player.user._id,
			reviewer: user.userInfo.user.username,
			content: reviewContent,
			leadership: parseInt(leadership),
			drafting: parseInt(drafting),
			knowledge: parseInt(knowledge),
			versatility: parseInt(versatility),
			technical: parseInt(technical),
			farming: parseInt(farming),
		};
		try {
			axios.post(
				'http://localhost:5000/api/review/create',
				{
					...newReview,
				},
				{ headers: { Authorization: token } }
			);
		} catch (err) {
			alert(err.response.data.msg);
		}
		setOpenReview(false);
		getReviews();
	};

	return isLoading ? (
		<Loading />
	) : (
		<Box m="1.5rem 2.5rem">
			<FlexBetween>
				{page === 'main' && (
					<Title
						title={player.user.username}
						subtitle={`Welcome to ${player.user.username}'s profile`}
					/>
				)}
				{page === 'review' && (
					<Title
						title={player.user.username}
						subtitle={`Welcome to ${player.user.username}'s reviews`}
					/>
				)}
				<Box display="flex" sx={{ minWidth: 120 }}>
					{page === 'review' && (
						<Box marginRight="0.5rem">
							<Button
								sx={{
									backgroundColor: theme.palette.secondary.light,
									color: theme.palette.background.alt,
									fontSize: '14px',
									fontWeight: 'bold',
									padding: '10px 20px',
								}}
								onClick={createReview}
							>
								Create Review
							</Button>
						</Box>
					)}
					<Button
						id="basic-button"
						aria-controls={open ? 'basic-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}
						onClick={handleClick}
						endIcon={<KeyboardArrowDownIcon />}
						sx={{
							backgroundColor: theme.palette.secondary.light,
							color: theme.palette.background.alt,
							fontSize: '14px',
							fontWeight: 'bold',
							padding: '10px 20px',
						}}
					>
						{page}
					</Button>
					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							'aria-labelledby': 'basic-button',
						}}
					>
						<MenuItem onClick={goToMain}>Main</MenuItem>
						<MenuItem onClick={goToReview}>Reviews</MenuItem>
					</Menu>
				</Box>
			</FlexBetween>
			{page === 'main' && (
				<Box>
					<Box display="flex" marginTop="1rem">
						<SmallBox
							title="Player Info"
							first={player.user.name}
							second="25 years old"
							third={player.user.position}
						/>
						<SmallBox title="Team Info" second="No Team" third="" />
					</Box>
					<Box display="flex" marginTop="1rem">
						<Box
							backgroundColor={theme.palette.background.alt}
							p="1.5rem"
							borderRadius="0.55rem"
						>
							<Typography
								variant="h4"
								sx={{ color: theme.palette.secondary[200] }}
							>
								Rating
							</Typography>
							<FlexBetween>
								<Typography
									variant="h5"
									sx={{ color: theme.palette.neutral[0] }}
								>
									Overall
								</Typography>
								<Rating
									name="read-only"
									value={player.rating.overallAvg}
									readOnly
								/>
							</FlexBetween>
							<FlexBetween>
								<Typography
									variant="h5"
									sx={{ color: theme.palette.neutral[0] }}
								>
									Leadership
								</Typography>
								<Rating
									name="read-only"
									value={player.rating.leadershipAvg}
									readOnly
								/>
							</FlexBetween>
							<FlexBetween>
								<Typography
									variant="h5"
									sx={{ color: theme.palette.neutral[0] }}
								>
									Drafting
								</Typography>
								<Rating
									name="read-only"
									value={player.rating.draftingAvg}
									readOnly
								/>
							</FlexBetween>
							<FlexBetween>
								<Typography
									variant="h5"
									sx={{ color: theme.palette.neutral[0] }}
								>
									Knowledge
								</Typography>
								<Rating
									name="read-only"
									value={player.rating.knowledgeAvg}
									readOnly
								/>
							</FlexBetween>
							<FlexBetween>
								<Typography
									variant="h5"
									sx={{ color: theme.palette.neutral[0] }}
								>
									Versatility
								</Typography>
								<Rating
									name="read-only"
									value={player.rating.versatilityAvg}
									readOnly
								/>
							</FlexBetween>
							<FlexBetween>
								<Typography
									variant="h5"
									sx={{ color: theme.palette.neutral[0] }}
								>
									Technical
								</Typography>
								<Rating
									name="read-only"
									value={player.rating.technicalAvg}
									readOnly
								/>
							</FlexBetween>
							<FlexBetween>
								<Typography
									variant="h5"
									sx={{ color: theme.palette.neutral[0] }}
								>
									Farming
								</Typography>
								<Rating
									name="read-only"
									value={player.rating.farmingAvg}
									readOnly
								/>
							</FlexBetween>
							<Box
								sx={{
									marginTop: '1rem',
									display: 'flex',
									justifyContent: 'center',
								}}
							>
								<Button
									variant="contained"
									sx={{
										backgroundColor: theme.palette.secondary.light,
										color: theme.palette.background.alt,
										fontSize: '.75rem',
										fontWeight: 'bold',
										padding: '5 10px',
										':hover': {
											bgcolor: theme.palette.secondary[400],
										},
									}}
									onClick={goToReview}
								>
									View More
								</Button>
							</Box>
						</Box>
					</Box>
				</Box>
			)}
			{page === 'review' &&
				reviews.map((review) => {
					return (
						<Box
							marginTop="1rem"
							backgroundColor={theme.palette.background.alt}
							p="1.5rem"
							borderRadius="0.55rem"
							key={review._id}
						>
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
									<Rating
										name="read-only"
										value={review.versatility}
										readOnly
									/>
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
								<Typography
									variant="h5"
									sx={{ color: theme.palette.neutral[0] }}
								>
									{review.content}
								</Typography>
								<Typography
									marginTop="1rem"
									variant="h6"
									sx={{ color: theme.palette.neutral[0] }}
								>
									By: {review.reviewer}
								</Typography>
							</Box>
						</Box>
					);
				})}
			<Box>
				<Dialog
					open={openReview}
					onClose={closeReview}
					sx={{
						'& .MuiDialog-container': {
							'& .MuiPaper-root': {
								width: '100%',
								maxWidth: '700px',
							},
						},
					}}
				>
					<DialogTitle>Create Review</DialogTitle>
					<DialogContent>
						<DialogContentText>
							<Stack direction="row" spacing={1}>
								<Box>
									<Typography>Leadership</Typography>
									<Rating
										name="leadership"
										defaultValue={0}
										precision={0.5}
										onChange={(e) => {
											setLeadership(e.target.value);
										}}
									/>
								</Box>
								<Box>
									<Typography>Drafting</Typography>
									<Rating
										name="drafting"
										defaultValue={0}
										precision={0.5}
										onChange={(e) => {
											setDrafting(e.target.value);
										}}
									/>
								</Box>
								<Box>
									<Typography>Knowledge</Typography>
									<Rating
										name="knowledge"
										defaultValue={0}
										precision={0.5}
										onChange={(e) => {
											setKnowledge(e.target.value);
										}}
									/>
								</Box>
								<Box>
									<Typography>Versatility</Typography>
									<Rating
										name="versatility"
										defaultValue={0}
										precision={0.5}
										onChange={(e) => {
											setVersatility(e.target.value);
										}}
									/>
								</Box>
								<Box>
									<Typography>Technical</Typography>
									<Rating
										name="technical"
										defaultValue={0}
										precision={0.5}
										onChange={(e) => {
											setTechnical(e.target.value);
										}}
									/>
								</Box>
								<Box>
									<Typography>Farming</Typography>
									<Rating
										name="farming"
										defaultValue={0}
										precision={0.5}
										onChange={(e) => {
											setFarming(e.target.value);
										}}
									/>
								</Box>
							</Stack>
						</DialogContentText>
						<TextField
							autoFocus
							margin="dense"
							id="name"
							label="Review"
							type="text"
							fullWidth
							variant="standard"
							onChange={(e) => {
								setReviewContent(e.target.value);
							}}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={closeReview}>Cancel</Button>
						<Button onClick={submitReview}>Submit</Button>
					</DialogActions>
				</Dialog>
			</Box>
		</Box>
	);
}

export default SelectedProfile;
