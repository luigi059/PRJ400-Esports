import { Box, Button, Rating, Typography, useTheme } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlexBetween, SmallBox, Title } from '../components';
import * as ROUTES from '../constants/routes';
import { GlobalState } from '../GlobalState';

const Dashboard = () => {
	const theme = useTheme();
	const state = useContext(GlobalState);
	const [user] = state.userApi.user;
	const navigate = useNavigate();

	useEffect(() => {
		console.log(state);
	}, []);

	return (
		<Box m="1.5rem 2.5rem">
			<FlexBetween>
				<Title title="DASHBOARD" subtitle="Welcome To Your Dashboard" />
			</FlexBetween>
			<Box display="flex" marginTop="1rem">
				<SmallBox
					title="Player Info"
					first={user.userInfo.user.name}
					second="25 years old"
					third={user.userInfo.user.position}
				/>
				<SmallBox title="Team Info" first="Nigma Galaxy" second="Europe" />
				<SmallBox title="Feed" first="" second="No New Feed" third="" />
				<SmallBox title="Inbox" first="" second="No New Messages" third="" />
			</Box>
			<Box display="flex" marginTop="1rem">
				<Box
					backgroundColor={theme.palette.background.alt}
					p="1.5rem"
					borderRadius="0.55rem"
				>
					<Typography variant="h4" sx={{ color: theme.palette.secondary[200] }}>
						Rating
					</Typography>
					<FlexBetween>
						<Typography variant="h5" sx={{ color: theme.palette.neutral[0] }}>
							Overall
						</Typography>
						<Rating
							name="read-only"
							value={user.userInfo.rating.overallAvg}
							readOnly
						/>
					</FlexBetween>
					<FlexBetween>
						<Typography variant="h5" sx={{ color: theme.palette.neutral[0] }}>
							Leadership
						</Typography>
						<Rating
							name="read-only"
							value={user.userInfo.rating.leadershipAvg}
							readOnly
						/>
					</FlexBetween>
					<FlexBetween>
						<Typography variant="h5" sx={{ color: theme.palette.neutral[0] }}>
							Drafting
						</Typography>
						<Rating
							name="read-only"
							value={user.userInfo.rating.draftingAvg}
							readOnly
						/>
					</FlexBetween>
					<FlexBetween>
						<Typography variant="h5" sx={{ color: theme.palette.neutral[0] }}>
							Knowledge
						</Typography>
						<Rating
							name="read-only"
							value={user.userInfo.rating.knowledgeAvg}
							readOnly
						/>
					</FlexBetween>
					<FlexBetween>
						<Typography variant="h5" sx={{ color: theme.palette.neutral[0] }}>
							Versatility
						</Typography>
						<Rating
							name="read-only"
							value={user.userInfo.rating.versatilityAvg}
							readOnly
						/>
					</FlexBetween>
					<FlexBetween>
						<Typography variant="h5" sx={{ color: theme.palette.neutral[0] }}>
							Technical
						</Typography>
						<Rating
							name="read-only"
							value={user.userInfo.rating.technicalAvg}
							readOnly
						/>
					</FlexBetween>
					<FlexBetween>
						<Typography variant="h5" sx={{ color: theme.palette.neutral[0] }}>
							Farming
						</Typography>
						<Rating
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
			</Box>
		</Box>
	);
};

export default Dashboard;
