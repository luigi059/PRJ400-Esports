import {
	DeleteOutlined,
	EditOutlined,
	ImageOutlined,
} from '@mui/icons-material';

import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	TextField,
	Typography,
	useTheme,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { GlobalState } from '../GlobalState';
import { FlexBetween, Loading, Title } from '../components';

function Team() {
	const theme = useTheme();
	const navigate = useNavigate();
	const state = useContext(GlobalState);
	const [user] = state.userApi.user;
	const [refreshData, setRefreshData] = state.userApi.refreshData;
	const [isLoading, setIsLoading] = useState(true);
	const [haveTeam, setHaveTeam] = useState(false);
	const [players, setPlayers] = useState([]);
	const token = localStorage.getItem('token');
	const [openLeaveTeam, setOpenLeaveTeam] = useState(false);
	const [openCreateTeam, setOpenCreateTeam] = useState(false);
	const [name, setName] = React.useState('');
	const [isImage, setIsImage] = useState(false);
	const [image, setImage] = useState(null);
	const mediumMain = theme.palette.secondary[100];
	const medium = theme.palette.secondary.main;

	const columns = [
		{ field: 'name', headerName: 'Name', flex: 1 },
		{ field: 'username', headerName: 'Game Tag', flex: 0.5 },
		{
			field: 'dob',
			headerName: 'Age',
			flex: 0.5,
		},
		{
			field: 'position',
			headerName: 'Position',
			flex: 0.5,
		},
		{
			field: 'nationality',
			headerName: 'Nationality',
			flex: 0.5,
		},
	];

	useEffect(() => {
		if (user.userInfo) {
			if (user.userInfo.team !== null) {
				setHaveTeam(true);
				getPlayers();
			}
			if (user.userInfo.team === null) {
				setHaveTeam(false);
			}
			setIsLoading(false);
		}
	}, [user]);

	const getPlayers = async () => {
		const res = await axios.get(
			`https://prj400-esports.onrender.com/api/team/${user.userInfo.user.teamId}`,
			{
				headers: { Authorization: token },
			}
		);
		setPlayers(res.data);
	};

	const handleRowClick = (params) => {
		if (params.id === user.userInfo.user._id) navigate('/profile');
		else navigate(`/profile/${params.id}`);
	};

	const leaveTeam = () => {
		setOpenLeaveTeam(true);
	};
	const closeLeaveTeam = () => {
		setOpenLeaveTeam(false);
	};

	const createTeam = () => {
		setOpenCreateTeam(true);
	};
	const closeCreateTeam = () => {
		setOpenCreateTeam(false);
	};

	const handleLeave = async () => {
		const response = await axios.patch(
			`https://prj400-esports.onrender.com/api/team/leave/${user.userInfo.user._id}`,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: token,
				},
			}
		);
		if (response) {
			if (refreshData) setRefreshData(false);
			else setRefreshData(true);
			setIsLoading(true);
			setOpenLeaveTeam(false);
		}
	};

	const handleCreate = async () => {
		const formData = new FormData();
		formData.append('name', name);
		if (image) {
			formData.append('file', image);
		}

		const response = await axios.post(
			'https://prj400-esports.onrender.com/api/team/create',
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: token,
				},
			}
		);
		if (response) {
			if (refreshData) setRefreshData(false);
			if (!refreshData) setRefreshData(true);
			setIsLoading(true);
			setOpenCreateTeam(false);
		}
	};

	return isLoading ? (
		<Loading />
	) : (
		<Box m="1.5rem 2.5rem">
			{haveTeam && (
				<Box>
					<FlexBetween>
						<Box
							sx={{
								display: 'flex',
							}}
						>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									marginRight: '10px',
								}}
							>
								<Title title={user.userInfo.team[0].name} />
							</Box>
							{user.userInfo.team[0].picturePath !== null && (
								<img
									width="60px"
									height="60px"
									alt="user"
									src={user.userInfo.team[0].picturePath}
								/>
							)}
						</Box>
						<Box display="flex" sx={{ minWidth: 120 }}>
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
								onClick={leaveTeam}
							>
								Leave Team
							</Button>
						</Box>
					</FlexBetween>
					<Box m="0.5rem 1.5rem">
						<Box
							sx={{
								'& .MuiDataGrid-root': {
									border: 'none',
								},
								'& .MuiDataGrid-cell': {
									borderBottom: 'none',
									':hover': {
										cursor: 'pointer',
									},
								},
								'& .MuiDataGrid-cellContent': {
									borderBottom: 'none',
									color: 'white',
								},
								'& .MuiDataGrid-columnHeaders': {
									backgroundColor: theme.palette.background.alt,
									color: theme.palette.secondary[100],
									borderBottom: 'none',
								},
								'& .MuiDataGrid-virtualScroller': {
									border: 'none',
									backgroundColor: theme.palette.primary.light,
								},
								'& .MuiDataGrid-footerContainer': {
									backgroundColor: theme.palette.background.alt,
									borderTop: 'none',
								},
								'& .MuiTablePagination-root': {
									color: theme.palette.secondary[100],
								},
								'& .MuiSvgIcon-root': {
									color: theme.palette.secondary[100],
								},
								'& .MuiButtonBase-root': {
									color: theme.palette.secondary[100],
								},
							}}
						>
							<DataGrid
								onRowClick={handleRowClick}
								getRowId={(players) => players._id}
								rows={players || []}
								columns={columns}
								autoHeight
								sx={{
									boxShadow: 2,
									border: 0,
								}}
							/>
						</Box>
					</Box>
					<Box>
						<Dialog
							open={openLeaveTeam}
							onClose={closeLeaveTeam}
							sx={{
								'& .MuiDialog-container': {
									'& .MuiPaper-root': {
										backgroundColor: theme.palette.background.alt,
										height: '100%',
										maxHeight: '150px',
										width: '100%',
										maxWidth: '700px',
									},
								},
							}}
						>
							<DialogContent>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'center',
										margin: '1rem',
									}}
								>
									<Typography variant="h3" color="white">
										Are you sure you want to leave this team?
									</Typography>
								</Box>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'center',
										margin: '1rem',
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
											marginRight: '1rem',
										}}
										onClick={handleLeave}
									>
										Yes
									</Button>
									<Button
										variant="contained"
										sx={{
											backgroundColor: theme.palette.primary.main,
											color: 'white',
											fontSize: '.75rem',
											fontWeight: 'bold',
											padding: '5 10px',
											':hover': {
												bgcolor: theme.palette.primary[500],
											},
										}}
										onClick={closeLeaveTeam}
									>
										No
									</Button>
								</Box>
							</DialogContent>
						</Dialog>
					</Box>
				</Box>
			)}
			{!haveTeam && (
				<Box>
					<FlexBetween>
						<Title
							title="Free Agent"
							subtitle="You currently have no team. Create a team right now"
						></Title>
						<Box display="flex" sx={{ minWidth: 120 }}>
							<Button
								sx={{
									backgroundColor: theme.palette.secondary.light,
									color: theme.palette.background.alt,
									fontSize: '14px',
									fontWeight: 'bold',
									padding: '10px 20px',
								}}
								onClick={createTeam}
							>
								Create Team
							</Button>
						</Box>
					</FlexBetween>
					<Box>
						<Dialog
							open={openCreateTeam}
							onClose={closeCreateTeam}
							sx={{
								'& .MuiDialog-container': {
									'& .MuiPaper-root': {
										backgroundColor: theme.palette.background.alt,
										height: '100%',
										maxHeight: '350px',
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
							<FlexBetween>
								<DialogTitle color={`${medium}`}>Create Team</DialogTitle>
							</FlexBetween>
							<DialogContent>
								<TextField
									autoFocus
									margin="dense"
									id="name"
									label="Team Name"
									type="text"
									fullWidth
									variant="standard"
									autoComplete="off"
									value={name}
									onChange={(e) => {
										setName(e.target.value);
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
								{isImage && (
									<Box
										border={`1px solid ${medium}`}
										borderRadius="5px"
										mt="1rem"
										p="1rem"
									>
										<Dropzone
											acceptedFiles=".jpg,.jpeg,.png"
											multiple={false}
											onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
										>
											{({ getRootProps, getInputProps }) => (
												<FlexBetween>
													<Box
														{...getRootProps()}
														border={`2px dashed ${theme.palette.primary.main}`}
														p="1rem"
														width="100%"
														sx={{ '&:hover': { cursor: 'pointer' } }}
													>
														<input {...getInputProps()} />
														{!image ? (
															<Typography color="white">
																Add Image Here
															</Typography>
														) : (
															<FlexBetween>
																<Typography color="white">
																	{image.name}
																</Typography>
																<EditOutlined sx={{ color: mediumMain }} />
															</FlexBetween>
														)}
													</Box>
													{image && (
														<IconButton
															onClick={() => setImage(null)}
															sx={{ width: '15%' }}
														>
															<DeleteOutlined sx={{ color: mediumMain }} />
														</IconButton>
													)}
												</FlexBetween>
											)}
										</Dropzone>
									</Box>
								)}
								<Box
									display="flex"
									gap="0.25rem"
									mt="1rem"
									onClick={() => setIsImage(!isImage)}
								>
									<ImageOutlined sx={{ color: mediumMain }} />
									<Typography
										color={mediumMain}
										sx={{ '&:hover': { cursor: 'pointer', color: medium } }}
									>
										Image
									</Typography>
								</Box>
							</DialogContent>
							<DialogActions>
								<Button onClick={closeCreateTeam}>Cancel</Button>
								<Button onClick={handleCreate}> Submit</Button>
							</DialogActions>
						</Dialog>
					</Box>
				</Box>
			)}
		</Box>
	);
}

export default Team;
