import {
	Avatar,
	Box,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import React from 'react';
import { FlexBetween, SmallBox, Title } from '../components';
import Twitch from '../images/twitch.png';
import Youtube from '../images/youtube.png';

const Dashboard = () => {
	const theme = useTheme();
	const isNonMediumScreens = useMediaQuery('(min-width: 1200px)');

	return (
		<Box m="1.5rem 2.5rem">
			<FlexBetween>
				<Title title="DASHBOARD" subtitle="Welcome To Your Dashboard" />
			</FlexBetween>
			<Box display="flex" marginTop="1rem">
				<SmallBox
					title="Player Info"
					first="Amer Al-Barkawi"
					second="25 years old"
					third="Position 2"
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
						Media
					</Typography>
					<FlexBetween>
						<img src={Youtube} alt=" description" />
						<img src={Twitch} alt=" description" />
					</FlexBetween>
				</Box>
			</Box>
		</Box>
	);
};

export default Dashboard;
