import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
	Box,
	Button,
	Menu,
	MenuItem,
	Rating,
	Typography,
	useTheme,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FlexBetween, Loading, SmallBox, Title } from '../components';

function SelectedProfile() {
	const theme = useTheme();
	const params = useParams();
	const [player, setPlayer] = useState({});
	const [isLoading, setIsLoading] = useState(true);
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
			console.log(res.data.userInfo);
		} catch (err) {
			alert(err.response.data.msg);
		}
	};

	useEffect(() => {
		getInfo();
	}, []);

	useEffect(() => {
		if (player.user) setIsLoading(false);
	}, [player]);

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	if (player === {}) return null;

	return isLoading ? (
		<Loading />
	) : (
		<Box m="1.5rem 2.5rem">
			<FlexBetween>
				<Title
					title={player.user.username}
					subtitle={`Welcome to ${player.user.username}'s profile`}
				/>
				<Box sx={{ minWidth: 120 }}>
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
						<MenuItem onClick={handleClose}>Main</MenuItem>
						<MenuItem onClick={handleClose}>Reviews</MenuItem>
					</Menu>
				</Box>
			</FlexBetween>
			<Box display="flex" marginTop="1rem">
				<SmallBox
					title="Player Info"
					first={player.user.name}
					second="25 years old"
					third={player.user.position}
				/>
				<SmallBox title="Team Info" first="Nigma Galaxy" second="Europe" />
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
							value={player.rating.overallAvg}
							readOnly
						/>
					</FlexBetween>
					<FlexBetween>
						<Typography variant="h5" sx={{ color: theme.palette.neutral[0] }}>
							Leadership
						</Typography>
						<Rating
							name="read-only"
							value={player.rating.leadershipAvg}
							readOnly
						/>
					</FlexBetween>
					<FlexBetween>
						<Typography variant="h5" sx={{ color: theme.palette.neutral[0] }}>
							Drafting
						</Typography>
						<Rating
							name="read-only"
							value={player.rating.draftingAvg}
							readOnly
						/>
					</FlexBetween>
					<FlexBetween>
						<Typography variant="h5" sx={{ color: theme.palette.neutral[0] }}>
							Knowledge
						</Typography>
						<Rating
							name="read-only"
							value={player.rating.knowledgeAvg}
							readOnly
						/>
					</FlexBetween>
					<FlexBetween>
						<Typography variant="h5" sx={{ color: theme.palette.neutral[0] }}>
							Versatility
						</Typography>
						<Rating
							name="read-only"
							value={player.rating.versatilityAvg}
							readOnly
						/>
					</FlexBetween>
					<FlexBetween>
						<Typography variant="h5" sx={{ color: theme.palette.neutral[0] }}>
							Technical
						</Typography>
						<Rating
							name="read-only"
							value={player.rating.technicalAvg}
							readOnly
						/>
					</FlexBetween>
					<FlexBetween>
						<Typography variant="h5" sx={{ color: theme.palette.neutral[0] }}>
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
						>
							View More
						</Button>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

export default SelectedProfile;
