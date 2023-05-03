import { Box, Button, Rating, Typography, useTheme } from '@mui/material';
import axios from 'axios';
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import enIE from 'date-fns/locale/en-IE';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import React, { useContext, useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { useNavigate } from 'react-router-dom';
import { GlobalState } from '../GlobalState';
import '../chat.css';
import { FlexBetween, Loading, SmallBox, Title } from '../components';
import * as ROUTES from '../constants/routes';

const Dashboard = () => {
	const theme = useTheme();
	const state = useContext(GlobalState);
	const [user] = state.userApi.user;
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const [haveTeam, setHaveTeam] = useState(false);
	const [reviews, setReviews] = useState([]);
	const [events, setEvents] = useState(undefined);
	const token = localStorage.getItem('token');

	useEffect(() => {
		if (user.userInfo) {
			if (user.userInfo.team !== null) {
				setHaveTeam(true);
				getEvents();
			}
			if (user.userInfo.team === null) {
				setHaveTeam(false);
			}
			getReviews();
			setIsLoading(false);
		}
	}, [user]);

	const locales = {
		'en-IE': enIE,
	};

	const localizer = dateFnsLocalizer({
		format,
		parse,
		startOfWeek,
		getDay,
		locales,
	});

	const getReviews = async () => {
		const res = await axios.get(
			`https://prj400-esports.onrender.com/api/review/get_reviews/${user.userInfo.user._id}`
		);
		setReviews(res.data);
	};
	const getEvents = async () => {
		try {
			const res = await axios.get(
				`https://prj400-esports.onrender.com/api/event/${user.userInfo.user.teamId}`,
				{
					headers: { Authorization: token },
				}
			);
			res.data.forEach((el) => {
				el.start = new Date(el.start);
				el.end = new Date(el.end);
			});
			setEvents(res.data);
		} catch (err) {
			alert(err.response.data.msg);
		}
	};

	return isLoading ? (
		<Loading />
	) : (
		<Box m="1.5rem 2.5rem">
			<FlexBetween>
				<Title title="DASHBOARD" subtitle="Welcome To Your Dashboard" />
			</FlexBetween>
			<Box display="flex" marginTop="1rem">
				<SmallBox
					title="Player Info"
					first={user.userInfo.user.name}
					second={`${user.userInfo.user.dob} years old`}
					third={user.userInfo.user.position}
					picture={user.userInfo.user.picturePath}
				/>
				{haveTeam && (
					<SmallBox
						title="Team Info"
						first={user.userInfo.team[0].name}
						second=""
						third=""
						picture={user.userInfo.team[0].picturePath}
					/>
				)}
				{!haveTeam && (
					<SmallBox title="Team Info" first="You Have No Team" third="" />
				)}
				{user.userInfo.invites.length > 0 && (
					<SmallBox
						title="Invites"
						first={`You have ${user.userInfo.invites.length} Pending Invites`}
						third=""
					/>
				)}
				{user.userInfo.invites.length === 0 && (
					<SmallBox
						title="Invites"
						first="You Have No Pending Invites"
						third=""
					/>
				)}
			</Box>
			<Box display="flex" marginTop="1rem">
				<Box
					backgroundColor={theme.palette.background.alt}
					p="1.5rem"
					borderRadius="0.55rem"
					mr="0.5rem"
				>
					<Typography variant="h4" sx={{ color: theme.palette.secondary[200] }}>
						Overall Rating
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
							m=".5rem"
							name="read-only"
							value={user.userInfo.rating.overallAvg}
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
							m=".5rem"
							name="read-only"
							value={user.userInfo.rating.leadershipAvg}
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
							m=".5rem"
							name="read-only"
							value={user.userInfo.rating.draftingAvg}
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
							m=".5rem"
							name="read-only"
							value={user.userInfo.rating.knowledgeAvg}
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
							m=".5rem"
							name="read-only"
							value={user.userInfo.rating.versatilityAvg}
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
							m=".5rem"
							name="read-only"
							value={user.userInfo.rating.technicalAvg}
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
							m=".5rem"
							name="read-only"
							value={user.userInfo.rating.farmingAvg}
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
							onClick={() => {
								navigate(ROUTES.REVIEW);
							}}
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
						width="600px"
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
				<Box
					backgroundColor={theme.palette.background.alt}
					p=".5rem"
					borderRadius="0.55rem"
				>
					<Typography
						mb=".5rem"
						variant="h4"
						sx={{ color: theme.palette.secondary[200] }}
					>
						Agenda
					</Typography>
					<Box
						sx={{
							'& .rbc-btn-group button': {
								color: 'white',
								':hover': {
									cursor: 'pointer',
									backgroundColor: theme.palette.primary[600],
								},
							},
							'& .rbc-btn-group button:focus': {
								backgroundColor: 'inherit',
							},
							'& .rbc-toolbar button.rbc-active': {
								backgroundColor: theme.palette.secondary[300],
							},
							'& .rbc-off-range-bg': {
								backgroundColor: theme.palette.primary[600],
							},
							'& .rbc-today': {
								backgroundColor: theme.palette.primary.light,
							},
							'& .rbc-toolbar-label': {
								color: 'white',
							},
							'& .rbc-agenda-empty': {
								color: 'white',
							},
							'& .rbc-agenda-table': {
								color: 'white',
							},
						}}
					>
						<Calendar
							localizer={localizer}
							events={events}
							views={['agenda']}
							defaultView={'agenda'}
							defaultDate={new Date()}
						/>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Dashboard;
