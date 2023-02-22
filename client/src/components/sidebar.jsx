import {
	AllInboxOutlined,
	ChevronLeft,
	ChevronRightOutlined,
	DynamicFeedOutlined,
	Groups2Outlined,
	HomeOutlined,
	ReviewsOutlined,
	SearchOutlined,
	SettingsOutlined,
} from '@mui/icons-material';
import {
	Box,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
	useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import profileImage from '../images/miracle.jfif';
import FlexBetween from './flexbetween';

const navItems = [
	{
		text: 'Home',
		link: 'profile',
		icon: <HomeOutlined />,
	},
	{
		text: 'Reviews',
		link: 'reviews',
		icon: <ReviewsOutlined />,
	},
	{
		text: 'Search',
		link: 'search',
		icon: <SearchOutlined />,
	},
	{
		text: 'Team',
		link: 'team',
		icon: <Groups2Outlined />,
	},
	{
		text: 'Inbox',
		link: 'inbox',
		icon: <AllInboxOutlined />,
	},
	{
		text: 'Feed',
		link: 'feed',
		icon: <DynamicFeedOutlined />,
	},
];

const Sidebar = ({
	drawerWidth,
	isSidebarOpen,
	setIsSidebarOpen,
	isNonMobile,
}) => {
	const { pathname } = useLocation();
	const [active, setActive] = useState('');
	const navigate = useNavigate();
	const theme = useTheme();

	useEffect(() => {
		setActive(pathname.substring(1));
	}, [pathname]);

	return (
		<Box component="nav">
			{isSidebarOpen && (
				<Drawer
					open={isSidebarOpen}
					onClose={() => setIsSidebarOpen(false)}
					variant="persistent"
					anchor="left"
					sx={{
						width: drawerWidth,
						'& .MuiDrawer-paper': {
							color: theme.palette.secondary[200],
							backgroundColor: theme.palette.background.alt,
							boxSixing: 'border-box',
							borderWidth: isNonMobile ? 0 : '2px',
							width: drawerWidth,
						},
					}}
				>
					<Box width="100%">
						<Box m="1.5rem 2rem 2rem 3rem">
							<Box
								gap="0.5rem"
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<Typography variant="h4" fontWeight="bold">
									ESPORTIFY
								</Typography>
							</Box>
							{!isNonMobile && (
								<IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
									<ChevronLeft />
								</IconButton>
							)}
						</Box>
						<List>
							{navItems.map(({ text, link, icon }) => {
								if (!icon) {
									return (
										<Typography key={text} sx={{ m: '2.25rem 0 1rem 3rem' }}>
											{text}
										</Typography>
									);
								}

								return (
									<ListItem key={text} disablePadding>
										<ListItemButton
											onClick={() => {
												navigate(`/${link}`);
												setActive(link);
											}}
											sx={{
												backgroundColor:
													active === link
														? theme.palette.secondary[300]
														: 'transparent',
												color:
													active === link
														? theme.palette.primary[600]
														: theme.palette.secondary[100],
											}}
										>
											<ListItemIcon
												sx={{
													ml: '2rem',
													color:
														active === link
															? theme.palette.primary[600]
															: theme.palette.secondary[200],
												}}
											>
												{icon}
											</ListItemIcon>
											<ListItemText primary={text} />
											{active === link && (
												<ChevronRightOutlined sx={{ ml: 'auto' }} />
											)}
										</ListItemButton>
									</ListItem>
								);
							})}
						</List>
					</Box>

					<Box position="absolute" bottom="2rem">
						<Divider />
						<FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
							<Box
								component="img"
								alt="profile"
								src={profileImage}
								height="40px"
								width="40px"
								borderRadius="50%"
								sx={{ objectFit: 'cover' }}
							/>
							<Box textAlign="left">
								<Typography
									fontWeight="bold"
									fontSize="0.9rem"
									sx={{ color: theme.palette.secondary[100] }}
								></Typography>
								<Typography
									fontSize="0.8rem"
									sx={{ color: theme.palette.secondary[200] }}
								></Typography>
							</Box>
							<SettingsOutlined
								sx={{
									color: theme.palette.secondary[300],
									fontSize: '25px ',
								}}
							/>
						</FlexBetween>
					</Box>
				</Drawer>
			)}
		</Box>
	);
};

export default Sidebar;
