import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import { FlexBetween, SmallBox, Title } from '../components';

const Dashboard = () => {
	const theme = useTheme();

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
				</Box>
			</Box>
		</Box>
	);
};

export default Dashboard;
