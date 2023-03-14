import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../GlobalState';

function Search() {
	const theme = useTheme();
	const state = useContext(GlobalState);

	const [search, setSearch] = state.searchAPI.search;
	const [players, setPlayers] = state.searchAPI.players;
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		console.log(players);
	}, []);

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
				overflow: 'hidden',
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
				<Box sx={{ overflowY: 'scroll' }}></Box>
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
