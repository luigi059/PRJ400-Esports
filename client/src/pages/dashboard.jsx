import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

import React from 'react';
import { FlexBetween, Title } from '../components';

const Dashboard = () => {
	const theme = useTheme();
	const isNonMediumScreens = useMediaQuery('(min-width: 1200px)');

	return (
		<Box m="1.5rem 2.5rem">
			<FlexBetween>
				<Title title="DASHBOARD" subtitle="Welcome To Your Dashboard" />
			</FlexBetween>
		</Box>
	);
};

export default Dashboard;
