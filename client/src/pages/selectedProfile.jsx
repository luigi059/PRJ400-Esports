import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
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
import { GlobalState } from '../GlobalState';
import { FlexBetween, Loading, SmallBox, Title } from '../components';

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
	const [post, setPost] = useState(null);
	const token = localStorage.getItem('token');
	const secondary = theme.palette.secondary[100];
	const [haveTeam, setHaveTeam] = useState(false);
	const medium = theme.palette.secondary.main;

	const getInfo = async () => {
		try {
			const res = await axios.get(
				`http://localhost:5000/api/user/info/${params.id}`,
				{
					headers: { Authorization: token },
				}
			);
			console.log(res.data.userInfo);
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

	const getPosts = async () => {
		try {
			const res = await axios.get(
				`http://localhost:5000/api/post/get/${params.id}`,
				{
					headers: { Authorization: token },
				}
			);
			setPost(res.data);
		} catch (err) {
			alert(err.response.data.msg);
		}
	};

	useEffect(() => {
		getInfo();
		getReviews();
		getPosts();
	}, []);
	useEffect(() => {
		setIsLoading(true);
		if (player.user && reviews) {
			if (player.team !== null) {
				setHaveTeam(true);
			}
			if (player.team === null) {
				setHaveTeam(false);
			}
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
	const goToFeed = () => {
		setPage('feed');
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
			revieweeName: player.user.username,
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
				{page === 'feed' && (
					<Title
						title={player.user.username}
						subtitle={`Welcome to ${player.user.username}'s feed`}
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
									'&:hover': {
										backgroundColor: theme.palette.secondary[400],
									},
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
							'&:hover': {
								backgroundColor: theme.palette.secondary[400],
							},
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
						sx={{
							'& .MuiPaper-root': {
								backgroundColor: theme.palette.primary[400],
							},
							'& .MuiMenuItem-root': {
								color: 'white',
							},
						}}
					>
						<MenuItem onClick={goToMain}>Main</MenuItem>
						<MenuItem onClick={goToReview}>Reviews</MenuItem>
						<MenuItem onClick={goToFeed}>Feed</MenuItem>
					</Menu>
				</Box>
			</FlexBetween>
			{page === 'main' && (
				<Box>
					<Box display="flex" marginTop="1rem">
						<SmallBox
							title="Player Info"
							first={player.user.name}
							second={`${player.user.dob} years old`}
							third={player.user.position}
							picture={player.user.picturePath}
						/>
						{haveTeam && (
							<SmallBox
								title="Team Info"
								first={player.team[0].name}
								second=""
								third=""
								picture={player.team[0].picturePath}
							/>
						)}
						{!haveTeam && (
							<SmallBox
								title="Team Info"
								first="This Player Has No Team"
								third=""
							/>
						)}
						<SmallBox
							title="Invites"
							first="This Person Has No Pending invites"
							second=""
							third=""
						/>
					</Box>
					<Box display="flex" marginTop="1rem">
						<Box
							backgroundColor={theme.palette.background.alt}
							p="1.5rem"
							borderRadius="0.55rem"
							mr=".5rem"
						>
							<Typography
								variant="h4"
								sx={{ color: theme.palette.secondary[200] }}
							>
								Rating
							</Typography>
							<FlexBetween>
								<Typography
									m=".5rem"
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
									m=".5rem"
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
									m=".5rem"
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
									m=".5rem"
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
									m=".5rem"
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
									m=".5rem"
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
									m=".5rem"
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
						{reviews.length > 0 && (
							<Box
								backgroundColor={theme.palette.background.alt}
								p="1rem"
								borderRadius="0.55rem"
								mr=".5rem"
							>
								<Typography
									variant="h4"
									sx={{ color: theme.palette.secondary[200] }}
								>
									Latest Review
								</Typography>
								<Box
									marginTop="1rem"
									backgroundColor={theme.palette.background.alt}
								>
									<FlexBetween>
										<Box>
											<Typography
												variant="h5"
												sx={{ color: theme.palette.neutral[0] }}
											>
												Leadership
											</Typography>
											<Rating
												name="read-only"
												value={reviews[0].leadership}
												readOnly
											/>
										</Box>
										<Box>
											<Typography
												variant="h5"
												sx={{ color: theme.palette.neutral[0] }}
											>
												Drafting
											</Typography>
											<Rating
												name="read-only"
												value={reviews[0].drafting}
												readOnly
											/>
										</Box>
										<Box>
											<Typography
												variant="h5"
												sx={{ color: theme.palette.neutral[0] }}
											>
												Knowledge
											</Typography>
											<Rating
												name="read-only"
												value={reviews[0].knowledge}
												readOnly
											/>
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
												value={reviews[0].versatility}
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
											<Rating
												name="read-only"
												value={reviews[0].technical}
												readOnly
											/>
										</Box>
										<Box>
											<Typography
												variant="h5"
												sx={{ color: theme.palette.neutral[0] }}
											>
												Farming
											</Typography>
											<Rating
												name="read-only"
												value={reviews[0].farming}
												readOnly
											/>
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
											{reviews[0].content}
										</Typography>
										<Typography
											marginTop="1rem"
											variant="h6"
											sx={{ color: theme.palette.neutral[0] }}
										>
											By: {reviews[0].reviewer}
										</Typography>
									</Box>
								</Box>
							</Box>
						)}
						{reviews.length === 0 && (
							<Box
								backgroundColor={theme.palette.background.alt}
								p="1rem"
								borderRadius="0.55rem"
								mr=".5rem"
								width="645px"
							>
								<Typography
									mb=".5rem"
									variant="h4"
									sx={{ color: theme.palette.secondary[200] }}
								>
									Latest Review
								</Typography>
								<Typography variant="h6" sx={{ color: 'white' }}>
									This person has no reviews
								</Typography>
							</Box>
						)}
						{post.length > 0 && (
							<Box
								backgroundColor={theme.palette.background.alt}
								p="1rem"
								borderRadius="0.55rem"
								position="relative"
							>
								<Typography
									variant="h4"
									sx={{ color: theme.palette.secondary[200] }}
								>
									Recent Post
								</Typography>
								<Box sx={{ padding: '.25rem' }}>
									<Typography color="white" sx={{ mt: '1rem' }}>
										{post[0].description}
									</Typography>
								</Box>
								<Box
									sx={{
										marginTop: '1rem',
										display: 'flex',
										justifyContent: 'center',
										position: 'absolute',
										bottom: '1.5rem',
										right: '5.5rem',
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
										onClick={goToFeed}
									>
										View More
									</Button>
								</Box>
							</Box>
						)}
						{post.length === 0 && (
							<Box
								backgroundColor={theme.palette.background.alt}
								p="1rem"
								borderRadius="0.55rem"
								sx={{ width: '290px' }}
							>
								<Typography
									variant="h4"
									sx={{ color: theme.palette.secondary[200] }}
								>
									Recent Post
								</Typography>
								<Typography variant="h6" sx={{ color: 'white' }}>
									This person has no posts
								</Typography>
							</Box>
						)}
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
			{page === 'feed' &&
				post.map((post) => {
					return (
						<Box
							sx={{
								margin: '2rem 0',
								padding: '1.5rem 1.5rem 0.75rem 1.5rem',
								backgroundColor: theme.palette.background.alt,
								borderRadius: '0.75rem',
							}}
							key={post._id}
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
											src={player.user.picturePath}
										/>
									</Box>
									<Box>
										<Typography color={secondary} variant="h4" fontWeight="500">
											{post.username}
										</Typography>
										<Typography
											color={secondary}
											variant="h6"
											fontWeight="500"
											fontStyle="italic"
										>
											{post.name}
										</Typography>
									</Box>
								</FlexBetween>
							</FlexBetween>
							<Divider sx={{ margin: '1.5rem 0' }} />
							<Typography color="white" sx={{ mt: '1rem' }}>
								{post.description}
							</Typography>
							{post.picturePath && (
								<img
									width="100%"
									height="auto"
									alt="post"
									style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
									src={post.picturePath}
								/>
							)}
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
								backgroundColor: theme.palette.background.alt,
								width: '100%',
								maxWidth: '700px',
							},
							'& .MuiButtonBase-root': {
								color: 'white',
								'&:hover': {
									backgroundColor: theme.palette.primary[400],
								},
							},
						},
					}}
				>
					<DialogTitle color={`${medium}`}>Create Review</DialogTitle>
					<DialogContent>
						<DialogContentText>
							<Stack direction="row" spacing={1}>
								<Box>
									<Typography sx={{ color: 'white' }}>Leadership</Typography>
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
									<Typography sx={{ color: 'white' }}>Drafting</Typography>
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
									<Typography sx={{ color: 'white' }}>Knowledge</Typography>
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
									<Typography sx={{ color: 'white' }}>Versatility</Typography>
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
									<Typography sx={{ color: 'white' }}>Technical</Typography>
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
									<Typography sx={{ color: 'white' }}>Farming</Typography>
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
							sx={{
								'& label': {
									color: 'white',
								},
								'& input': {
									color: 'white',
								},
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
