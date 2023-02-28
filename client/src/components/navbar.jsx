import {
	ArrowDropDownOutlined,
	Menu as MenuIcon,
	Search,
	SettingsOutlined,
} from '@mui/icons-material';
import {
	AppBar,
	Box,
	Button,
	IconButton,
	InputBase,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
	useTheme,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import profileImage from '../images/miracle.jfif';
import FlexBetween from './flexbetween';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
	const theme = useTheme();

	const [anchorEl, setAnchorEl] = useState(null);
	const isOpen = Boolean(anchorEl);
	const handleClick = (event) => setAnchorEl(event.currentTarget);
	const handleClose = async () => {
		setAnchorEl(null);
		await axios.get('http://localhost:5000/api/user/logout');
		localStorage.removeItem('token');
		window.location.href = '/';
	};

	return (
		<AppBar
			sx={{
				position: 'static',
				background: 'none',
				boxShadow: 'none',
			}}
		>
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				{/* LEFT SIDE */}
				<FlexBetween>
					<IconButton
						sx={{
							color: theme.palette.secondary[300],
						}}
						onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					>
						<MenuIcon />
					</IconButton>
					<FlexBetween
						backgroundColor={theme.palette.background.alt}
						borderRadius="9px"
						gap="3rem"
						p="0.1rem 1.5rem"
					>
						<InputBase
							placeholder="Search..."
							sx={{
								color: theme.palette.secondary[300],
							}}
						/>
						<IconButton
							sx={{
								color: theme.palette.secondary[300],
							}}
						>
							<Search />
						</IconButton>
					</FlexBetween>
				</FlexBetween>

				{/* RIGHT SIDE */}
				<FlexBetween gap="1.5rem">
					<IconButton>
						<SettingsOutlined
							sx={{ color: theme.palette.secondary[300], fontSize: '25px' }}
						/>
					</IconButton>

					<FlexBetween>
						<Button
							onClick={handleClick}
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								textTransform: 'none',
								gap: '1rem',
							}}
						>
							<Box
								component="img"
								alt="profile"
								src={profileImage}
								height="32px"
								width="32px"
								borderRadius="50%"
								sx={{ objectFit: 'cover' }}
							/>
							<Box textAlign="left">
								<Typography
									fontWeight="bold"
									fontSize="0.85rem"
									sx={{ color: theme.palette.secondary[100] }}
								></Typography>
								<Typography
									fontSize="0.75rem"
									sx={{ color: theme.palette.secondary[200] }}
								></Typography>
							</Box>
							<ArrowDropDownOutlined
								sx={{ color: theme.palette.secondary[300], fontSize: '25px' }}
							/>
						</Button>
						<Menu
							anchorEl={anchorEl}
							open={isOpen}
							onClose={handleClose}
							anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
						>
							<MenuItem onClick={handleClose}>Log Out</MenuItem>
						</Menu>
					</FlexBetween>
				</FlexBetween>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
