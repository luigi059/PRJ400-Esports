import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormLabel,
	TextField,
	useTheme,
} from '@mui/material';
import axios from 'axios';
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import enIE from 'date-fns/locale/en-IE';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FlexBetween, Loading, Title } from '../components';

function Schedule() {
	const theme = useTheme();
	const [events, setEvents] = useState(undefined);
	const [openCreateEvent, setOpenCreateEvent] = useState(false);
	const [title, setTitle] = React.useState('');
	const [startDate, setStartDate] = React.useState(new Date());
	const [endDate, setEndDate] = React.useState(new Date());
	const [description, setDescription] = React.useState('');
	const token = localStorage.getItem('token');
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		getEvents();
	}, []);
	useEffect(() => {
		if (events) {
			setIsLoading(false);
		}
	}, [events]);

	const locales = {
		'en-IE': enIE,
	};

	const localizer = dateFnsLocalizer({
		format,
		parse,
		startOfWeek,
		getDay,
		locales,
	});

	const openEventClick = (event) => {
		console.log(event);
	};

	const createEvent = () => {
		setOpenCreateEvent(true);
	};
	const closeCreateEvent = () => {
		setOpenCreateEvent(false);
	};

	const getEvents = async () => {
		try {
			const res = await axios.get('http://localhost:5000/api/event', {
				headers: { Authorization: token },
			});
			setEvents(res.data);
		} catch (err) {
			alert(err.response.data.msg);
		}
	};

	const onSubmit = () => {
		const newEvent = {
			title: title,
			start: startDate,
			end: endDate,
			description: description,
		};
		axios.post(
			'http://localhost:5000/api/event/create',
			{
				...newEvent,
			},
			{ headers: { Authorization: token } }
		);
		setOpenCreateEvent(false);
		window.location.reload(false);
	};

	return isLoading ? (
		<Loading />
	) : (
		<Box m="1.5rem 2.5rem">
			<FlexBetween>
				<Title title="SCHEDULE" subtitle="Welcome To Your Calendar" />
				<Box display="flex" sx={{ minWidth: 120 }}>
					<Button
						sx={{
							backgroundColor: theme.palette.secondary.light,
							color: theme.palette.background.alt,
							fontSize: '14px',
							fontWeight: 'bold',
							padding: '10px 20px',
						}}
						onClick={createEvent}
					>
						Create Event
					</Button>
				</Box>
			</FlexBetween>
			<Box
				sx={{
					'& .rbc-btn-group button': {
						color: 'white',
						':hover': {
							cursor: 'pointer',
							backgroundColor: theme.palette.primary[600],
						},
					},
					'& .rbc-btn-group button:focus': {
						backgroundColor: 'inherit',
					},
					'& .rbc-toolbar button.rbc-active': {
						backgroundColor: theme.palette.secondary[300],
					},
					'& .rbc-off-range-bg': {
						backgroundColor: theme.palette.primary[600],
					},
					'& .rbc-today': {
						backgroundColor: theme.palette.primary.light,
					},
				}}
			>
				<Calendar
					localizer={localizer}
					startAccessor="start"
					endAccessor="end"
					events={events}
					style={{
						backgroundColor: theme.palette.background.alt,
						color: 'white',
						borderRadius: '3px',
						height: 600,
						margin: 25,
					}}
					onSelectEvent={openEventClick}
				/>
			</Box>
			<Box>
				<Dialog
					open={openCreateEvent}
					onClose={closeCreateEvent}
					sx={{
						'& .MuiDialog-container': {
							'& .MuiPaper-root': {
								height: '100%',
								maxHeight: '400px',
								width: '100%',
								maxWidth: '700px',
							},
						},
					}}
				>
					<DialogTitle>Create Event</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							margin="dense"
							id="name"
							label="Title"
							type="text"
							fullWidth
							variant="standard"
							onChange={(e) => {
								setTitle(e.target.value);
							}}
						/>
						<FormLabel>Start Date</FormLabel>
						<DatePicker
							placeholderText="Select date"
							onChange={(date) => setStartDate(date)}
							selected={startDate}
							value={startDate}
							showTimeSelect
							timeFormat="HH:mm"
							dateFormat="d MMMM, yyyy HH:mm"
							className="form-control"
							id="start"
						/>
						<FormLabel>End Date</FormLabel>
						<DatePicker
							placeholderText="Select End date"
							onChange={(date) => setEndDate(date)}
							selected={endDate}
							value={endDate}
							timeFormat="HH:mm"
							dateFormat="d MMMM, yyyy HH:mm"
							showTimeSelect
							className="form-control"
							id="end"
						/>
						<TextField
							autoFocus
							margin="dense"
							id="name"
							label="Description"
							type="text"
							fullWidth
							variant="standard"
							onChange={(e) => {
								setDescription(e.target.value);
							}}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={closeCreateEvent}>Cancel</Button>
						<Button onClick={onSubmit}>Submit</Button>
					</DialogActions>
				</Dialog>
			</Box>
		</Box>
	);
}

export default Schedule;
