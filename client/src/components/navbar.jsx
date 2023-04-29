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
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalState } from '../GlobalState';
import * as ROUTES from '../constants/routes';
import FlexBetween from './flexbetween';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
	const theme = useTheme();
	const navigate = useNavigate();
	const state = useContext(GlobalState);
	const [anchorEl, setAnchorEl] = useState(null);
	const [user] = state.userApi.user;
	const [search, setSearch] = state.searchAPI.search;
	const isOpen = Boolean(anchorEl);
	const [isLoading, setIsLoading] = useState(true);
	const [gameTag, setGameTag] = useState('');

	useEffect(() => {
		if (user.userInfo) {
			setIsLoading(false);
		}
	}, [user]);

	const handleClick = (event) => setAnchorEl(event.currentTarget);
	const handleClose = async () => {
		setAnchorEl(null);
		await axios.get('https://prj400-esports.onrender.com/api/user/logout');
		localStorage.removeItem('token');
		window.location.href = '/';
	};

	const onChangeInput = (e) => {
		setGameTag(e.target.value);
	};

	const searchSubmit = async (e) => {
		e.preventDefault();
		setSearch(`username[regex]=${gameTag}`);
		navigate(ROUTES.SEARCH);
	};

	return isLoading ? (
		<div></div>
	) : (
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
						<form onSubmit={searchSubmit}>
							<InputBase
								type="text"
								autoComplete="off"
								name="search"
								placeholder="Search For Players..."
								onChange={onChangeInput}
								sx={{
									color: theme.palette.secondary[300],
								}}
							/>
							<IconButton
								onClick={searchSubmit}
								sx={{
									color: theme.palette.secondary[300],
								}}
							>
								<Search />
							</IconButton>
						</form>
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
								src={user.userInfo.user.picturePath}
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
