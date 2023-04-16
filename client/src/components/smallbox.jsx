import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';

const SmallBox = ({ title, first, second, third }) => {
	const theme = useTheme();
	return (
		<Box
			p="1.25rem 1rem"
			flex="1"
			backgroundColor={theme.palette.background.alt}
			borderRadius="0.55rem"
			sx={{
				'&:not(:last-child)': {
					marginRight: '.5rem',
				},
			}}
		>
			<Typography variant="h4" sx={{ color: theme.palette.secondary[200] }}>
				{title}
			</Typography>

			<Typography variant="h5" sx={{ color: theme.palette.neutral[0] }}>
				{first}
			</Typography>
			<Typography variant="h5" sx={{ color: theme.palette.neutral[0] }}>
				{second}
			</Typography>
			<Typography variant="h5" sx={{ color: theme.palette.neutral[0] }}>
				{third}
			</Typography>
		</Box>
	);
};

export default SmallBox;
