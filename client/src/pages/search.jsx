import { Delete, ExpandMore } from '@mui/icons-material';

import {
	Box,
	Button,
	InputBase,
	Menu,
	MenuItem,
	Rating,
	Typography,
	useTheme,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalState } from '../GlobalState';
import { FlexBetween, Title } from '../components';

function Search() {
	const theme = useTheme();
	const navigate = useNavigate();
	const state = useContext(GlobalState);

	const [search, setSearch] = state.searchAPI.search;
	const [players, setPlayers] = state.searchAPI.players;

	const [isName, setIsName] = useState(false);
	const [name, setName] = useState('');
	const [isGameTag, setIsGameTag] = useState(false);
	const [gameTag, setGameTag] = useState('');
	const [isAge, setIsAge] = useState(false);
	const [age, setAge] = useState('');
	const [isPosition, setIsPosition] = useState(false);
	const [position, setPosition] = useState('');
	const [isNationality, setIsNationality] = useState(false);
	const [nationality, setNationality] = useState('');
	const [isTeam, setIsTeam] = useState(false);
	const [isVersatility, setIsVersatility] = useState(false);
	const [team, setTeam] = useState('');

	const handleRowClick = (params) => {
		navigate(`/profile/${params.id}`);
	};
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const addParams = (params) => {
		console.log(params);
		switch (params) {
			case 1:
				setIsName(true);
				break;
			case 2:
				setIsGameTag(true);
				break;
			case 3:
				setIsAge(true);
				break;
			case 4:
				setIsPosition(true);
				break;
			case 5:
				setIsNationality(true);
				break;
			case 6:
				setIsTeam(true);
				break;
			case 7:
				setIsVersatility(true);
				break;
			default:
				return;
		}
	};
	const deleteParams = (params) => {
		switch (params) {
			case 1:
				setIsName(false);
				setName('');
				break;
			case 2:
				setIsGameTag(false);
				setGameTag('');
				break;
			case 3:
				setIsAge(false);
				setAge('');
				break;
			case 4:
				setIsPosition(false);
				setPosition('');
				break;
			case 5:
				setIsNationality(false);
				setNationality('');
				break;
			case 6:
				setIsTeam(false);
				setTeam('');
				break;
			case 7:
				setIsVersatility(false);
				break;
			default:
				return;
		}
	};
	const onChangeInput = (e) => {
		switch (e.target.name) {
			case 'name':
				setName(e.target.value);
				break;
			case 'gameTag':
				setGameTag(e.target.value);
				break;
			case 'position':
				setPosition(e.target.value);
				break;
			case 'nationality':
				setNationality(e.target.value);
				break;
			default:
				return;
		}
	};
	const handleSearch = () => {
		setSearch(
			`username[regex]=${gameTag}&name[regex]=${name}&position[regex]=${position}&nationality[regex]=${nationality}`
		);
	};

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
		{
			field: 'team',
			headerName: 'Team',
			flex: 0.5,
		},
	];

	return (
		<Box
			display="grid"
			sx={{
				height: 'calc(100vh - 64px)',
				gridTemplateRows: '1fr 1fr',
			}}
		>
			<Box m="0.5rem 1.5rem">
				<Typography
					variant="h4"
					color={theme.palette.secondary[100]}
					fontWeight="bold"
				>
					SEARCH
				</Typography>
				<FlexBetween mb="1rem">
					<Box></Box>
					<Box display="flex" sx={{ minWidth: 120 }}>
						<Button
							id="basic-button"
							aria-controls={open ? 'basic-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={open ? 'true' : undefined}
							onClick={handleClick}
							endIcon={<ExpandMore />}
							sx={{
								backgroundColor: theme.palette.secondary.light,
								color: theme.palette.background.alt,
								fontSize: '14px',
								fontWeight: 'bold',
								padding: '10px 20px',
							}}
						>
							Add Parameters
						</Button>
						<Box marginLeft="0.5rem">
							<Button
								sx={{
									backgroundColor: theme.palette.secondary.light,
									color: theme.palette.background.alt,
									fontSize: '14px',
									fontWeight: 'bold',
									padding: '10px 20px',
								}}
								onClick={handleSearch}
							>
								Submit Search
							</Button>
						</Box>
						<Menu
							id="basic-menu"
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							MenuListProps={{
								'aria-labelledby': 'basic-button',
							}}
						>
							<MenuItem onClick={() => addParams(1)}>Name</MenuItem>
							<MenuItem onClick={() => addParams(2)}>Game Tag</MenuItem>
							<MenuItem onClick={() => addParams(3)}>Age</MenuItem>
							<MenuItem onClick={() => addParams(4)}>Position</MenuItem>
							<MenuItem onClick={() => addParams(5)}>Nationality</MenuItem>
							<MenuItem onClick={() => addParams(6)}>Team</MenuItem>
							<MenuItem onClick={() => addParams(7)}>Versatility</MenuItem>
						</Menu>
					</Box>
				</FlexBetween>
				<Box
					sx={{
						overflow: 'hidden',
						overflowY: 'scroll',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					{isName && (
						<Box
							borderRadius="5px"
							gap="3rem"
							p="0.5rem 1.5rem"
							m="0.5rem"
							sx={{
								width: '800px',
								border: '1px solid',
								borderColor: theme.palette.primary.main,
							}}
						>
							<FlexBetween>
								<Title subtitle="Name"></Title>
								<Delete
									onClick={() => deleteParams(1)}
									sx={{
										cursor: 'pointer',
										color: theme.palette.secondary.main,
									}}
								/>
							</FlexBetween>
							<InputBase
								type="text"
								autoComplete="off"
								name="name"
								onChange={onChangeInput}
								sx={{
									width: '100%',
									backgroundColor: theme.palette.background.alt,
									color: theme.palette.secondary[300],
								}}
							/>
						</Box>
					)}
					{isGameTag && (
						<Box
							borderRadius="5px"
							gap="3rem"
							p="0.5rem 1.5rem"
							m="0.5rem"
							sx={{
								width: '800px',
								border: '1px solid',
								borderColor: theme.palette.primary.main,
							}}
						>
							<FlexBetween>
								<Title subtitle="Game Tag"></Title>
								<Delete
									onClick={() => deleteParams(2)}
									sx={{
										cursor: 'pointer',
										color: theme.palette.secondary.main,
									}}
								/>
							</FlexBetween>
							<InputBase
								type="text"
								autoComplete="off"
								name="gameTag"
								onChange={onChangeInput}
								sx={{
									width: '100%',
									backgroundColor: theme.palette.background.alt,
									color: theme.palette.secondary[300],
								}}
							/>
						</Box>
					)}
					{isAge && (
						<Box
							borderRadius="5px"
							gap="3rem"
							p="0.5rem 1.5rem"
							m="0.5rem"
							sx={{
								width: '800px',
								border: '1px solid',
								borderColor: theme.palette.primary.main,
							}}
						>
							<FlexBetween>
								<Title subtitle="Age"></Title>
								<Delete
									onClick={() => deleteParams(3)}
									sx={{
										cursor: 'pointer',
										color: theme.palette.secondary.main,
									}}
								/>
							</FlexBetween>
							<InputBase
								type="text"
								autoComplete="off"
								name="age"
								onChange={onChangeInput}
								sx={{
									width: '100%',
									backgroundColor: theme.palette.background.alt,
									color: theme.palette.secondary[300],
								}}
							/>
						</Box>
					)}
					{isPosition && (
						<Box
							borderRadius="5px"
							gap="3rem"
							p="0.5rem 1.5rem"
							m="0.5rem"
							sx={{
								width: '800px',
								border: '1px solid',
								borderColor: theme.palette.primary.main,
							}}
						>
							<FlexBetween>
								<Title subtitle="Position"></Title>
								<Delete
									onClick={() => deleteParams(4)}
									sx={{
										cursor: 'pointer',
										color: theme.palette.secondary.main,
									}}
								/>
							</FlexBetween>
							<InputBase
								type="text"
								autoComplete="off"
								name="position"
								onChange={onChangeInput}
								sx={{
									width: '100%',
									backgroundColor: theme.palette.background.alt,
									color: theme.palette.secondary[300],
								}}
							/>
						</Box>
					)}
					{isNationality && (
						<Box
							borderRadius="5px"
							gap="3rem"
							p="0.5rem 1.5rem"
							m="0.5rem"
							sx={{
								width: '800px',
								border: '1px solid',
								borderColor: theme.palette.primary.main,
							}}
						>
							<FlexBetween>
								<Title subtitle="Nationality"></Title>
								<Delete
									onClick={() => deleteParams(5)}
									sx={{
										cursor: 'pointer',
										color: theme.palette.secondary.main,
									}}
								/>
							</FlexBetween>
							<InputBase
								type="text"
								autoComplete="off"
								name="nationality"
								onChange={onChangeInput}
								sx={{
									width: '100%',
									backgroundColor: theme.palette.background.alt,
									color: theme.palette.secondary[300],
								}}
							/>
						</Box>
					)}
					{isTeam && (
						<Box
							borderRadius="5px"
							gap="3rem"
							p="0.5rem 1.5rem"
							m="0.5rem"
							sx={{
								width: '800px',
								border: '1px solid',
								borderColor: theme.palette.primary.main,
							}}
						>
							<FlexBetween>
								<Title subtitle="Team"></Title>
								<Delete
									onClick={() => deleteParams(6)}
									sx={{
										cursor: 'pointer',
										color: theme.palette.secondary.main,
									}}
								/>
							</FlexBetween>
							<InputBase
								type="text"
								autoComplete="off"
								name="team"
								onChange={onChangeInput}
								sx={{
									width: '100%',
									backgroundColor: theme.palette.background.alt,
									color: theme.palette.secondary[300],
								}}
							/>
						</Box>
					)}
					{isVersatility && (
						<Box
							borderRadius="5px"
							gap="3rem"
							p="0.5rem 1.5rem"
							m="0.5rem"
							sx={{
								width: '800px',
								border: '1px solid',
								borderColor: theme.palette.primary.main,
							}}
						>
							<FlexBetween>
								<Title subtitle="Versatility"></Title>
								<Delete
									onClick={() => deleteParams(7)}
									sx={{
										cursor: 'pointer',
										color: theme.palette.secondary.main,
									}}
								/>
							</FlexBetween>
							<Rating name="versatility" defaultValue={0} precision={0.5} />
						</Box>
					)}
				</Box>
			</Box>
			<Box m="0.5rem 1.5rem">
				<Typography
					variant="h4"
					color={theme.palette.secondary[100]}
					fontWeight="bold"
				>
					RESULTS
				</Typography>
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
		</Box>
	);
}

export default Search;
