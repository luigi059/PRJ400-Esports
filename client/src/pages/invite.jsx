import { CheckOutlined, ClearOutlined } from '@mui/icons-material';
import { Box, Divider, Typography, useTheme } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalState } from '../GlobalState';
import { FlexBetween, Loading, Title } from '../components';
import * as ROUTES from '../constants/routes';

function Invite() {
	const theme = useTheme();
	const state = useContext(GlobalState);
	const [user] = state.userApi.user;
	const [refreshData, setRefreshData] = state.userApi.refreshData;
	const [isLoading, setIsLoading] = useState(true);
	const token = localStorage.getItem('token');
	const main = theme.palette.secondary.main;
	const secondary = theme.palette.secondary[100];
	const navigate = useNavigate();

	useEffect(() => {
		if (user.userInfo) {
			setIsLoading(false);
		}
	}, [user]); // eslint-disable-line react-hooks/exhaustive-deps

	const handleAccept = async (id) => {
		console.log(token);
		const response = await axios.patch(
			`https://prj400-esports.onrender.com/api/invite/accept/${id}`,
			{
				userId: user.userInfo.user._id,
			},
			{
				headers: {
					Authorization: token,
				},
			}
		);
		if (response) {
			if (refreshData) setRefreshData(false);
			else setRefreshData(true);
			setIsLoading(true);
		}
		navigate(ROUTES.TEAM);
	};
	const handleReject = async (id) => {
		const response = await axios.delete(
			`https://prj400-esports.onrender.com/api/invite/reject/${id}`,
			{
				headers: { Authorization: token },
			}
		);
		if (response) {
			if (refreshData) setRefreshData(false);
			else setRefreshData(true);
			setIsLoading(true);
		}
	};

	return isLoading ? (
		<Loading />
	) : (
		<Box m="1.5rem 2.5rem">
			<FlexBetween>
				<Title title="INVITES" subtitle="Welcome To Your Team Invites" />
			</FlexBetween>
			{user.userInfo.invites.map((invite) => {
				return (
					<Box
						key={invite._id}
						sx={{
							margin: '2rem 0',
							padding: '1.5rem 1.5rem 0.75rem 1.5rem',
							backgroundColor: theme.palette.background.alt,
							borderRadius: '0.75rem',
						}}
					>
						<FlexBetween gap="1rem">
							<Box width="55px" height="55px">
								<img
									style={{ objectFit: 'cover', borderRadius: '50%' }}
									width="55px"
									height="55px"
									alt="user"
									src={invite.teamPicture}
								/>
							</Box>
							<FlexBetween>
								<Box m=".5em">
									<CheckOutlined
										onClick={() => handleAccept(invite._id)}
										sx={{
											color: secondary,
											'&:hover': { cursor: 'pointer', color: main },
										}}
									/>
								</Box>
								<Box m=".5em">
									<ClearOutlined
										onClick={() => handleReject(invite._id)}
										sx={{
											color: secondary,
											'&:hover': { cursor: 'pointer', color: main },
										}}
									/>
								</Box>
							</FlexBetween>
						</FlexBetween>
						<Typography color={secondary} variant="h4" fontWeight="500">
							You are being invited to {invite.teamName}
						</Typography>
						<Divider sx={{ margin: '1.5rem 0' }} />
						<Typography color="white" sx={{ mt: '1rem' }}>
							{invite.description}
						</Typography>
					</Box>
				);
			})}
		</Box>
	);
}

export default Invite;
