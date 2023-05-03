import {
	DeleteOutlined,
	EditOutlined,
	ImageOutlined,
} from '@mui/icons-material';
import {
	Autocomplete,
	Box,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
	useTheme,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { FlexBetween, Form, Header } from '../components';
import * as ROUTES from '../constants/routes';
import logo from '../logo.png';

export default function SignUp() {
	const navigate = useNavigate();
	const theme = useTheme();
	const [isImage, setIsImage] = useState(false);
	const [image, setImage] = useState(null);
	const [nationalities, setNationalities] = useState([]);
	const [loading, setLoading] = useState(true);
	const mediumMain = theme.palette.secondary[100];
	const medium = theme.palette.secondary.main;

	useEffect(() => {
		fetchNationalities();
	}, []);

	const [user, setUser] = useState({
		name: '',
		tag: '',
		email: '',
		password: '',
		dob: '',
		nationality: '',
		position: '',
	});

	const positions = [
		'Position 1',
		'Position 2',
		'Position 3',
		'Position 4',
		'Position 5',
	];

	const onChangeInput = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	const fetchNationalities = async () => {
		try {
			const countries = await axios.get('https://restcountries.com/v3.1/all');
			const fetchedNationalities = countries.data.map(
				(country) => country.name.common
			);
			setNationalities(fetchedNationalities);
			setLoading(false);
		} catch (error) {
			console.error('Error fetching nationalities:', error);
			setLoading(false);
		}
	};

	const handleSignUp = async (event) => {
		const formData = new FormData();
		// eslint-disable-next-line no-restricted-globals
		formData.append('name', user.name);
		formData.append('username', user.tag);
		formData.append('email', user.email);
		formData.append('password', user.password);
		formData.append('dob', user.dob);
		formData.append('nationality', user.nationality);
		formData.append('position', user.position);
		if (image) {
			formData.append('file', image);
		}

		event.preventDefault();
		try {
			const res = await axios.post(
				'http://localhost:5000/api/user/register',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);
			localStorage.setItem('token', res.data.accessToken);

			await axios.post(
				'https://api.chatengine.io/users/',
				{
					username: user.tag,
					secret: user.tag,
				},
				{
					headers: {
						'PRIVATE-KEY': '34bb7d03-e047-4506-9dd8-2b0854bfb7cf',
					},
				}
			);

			navigate(ROUTES.PROFILE);
		} catch (err) {
			alert(err.response.data.msg);
		}
	};
	return (
		<>
			<Box>
				<Box sx={{ margin: '3rem' }}>
					<FlexBetween>
						<Header.Logo to={ROUTES.HOME} src={logo} alt="ESports" />
						<Header.ButtonLink to={ROUTES.SIGN_IN}>Sign In</Header.ButtonLink>
					</FlexBetween>
				</Box>
				<Form>
					<Form.Base>
						<Form.Title>Sign Up</Form.Title>
						<Form.InputGroup onSubmit={handleSignUp}>
							<Form.Input
								required
								autoComplete="off"
								placeholder="Name"
								name="name"
								value={user.name}
								onChange={onChangeInput}
							/>
							<Form.Input
								required
								autoComplete="off"
								placeholder="Game Tag"
								name="tag"
								value={user.tag}
								onChange={onChangeInput}
							/>
							<Form.Input
								required
								autoComplete="off"
								placeholder="Email Address"
								name="email"
								value={user.email}
								onChange={onChangeInput}
							/>
							<Form.Input
								required
								type="password"
								autoComplete="off"
								placeholder="Password"
								name="password"
								value={user.password}
								onChange={onChangeInput}
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
								onClick={() => setIsImage(!isImage)}
							>
								<ImageOutlined sx={{ color: mediumMain }} />
								<Typography
									color={mediumMain}
									sx={{ '&:hover': { cursor: 'pointer', color: medium } }}
								>
									Profile Image
								</Typography>
							</Box>

							<Form.Text>Date of Birth</Form.Text>
							<Form.Input
								required
								autoComplete="off"
								type="date"
								name="dob"
								value={user.dob}
								onChange={onChangeInput}
							/>
							<Box sx={{ minWidth: 120, mt: 2, mb: 2 }}>
								<FormControl
									fullWidth
									sx={{
										'& .MuiInputBase-root': {
											backgroundColor: '#333',
											height: '4em',
											color: 'white',
										},
										'& .MuiButtonBase-root': {
											color: 'white',
										},
									}}
								>
									<Autocomplete
										id="nationality-autocomplete"
										name="nationality"
										options={nationalities}
										getOptionLabel={(option) => option}
										renderInput={(params) => (
											<TextField
												{...params}
												label="Nationality"
												InputLabelProps={{
													htmlFor: 'nationality-autocomplete',
													sx: {
														color: 'white',
													},
												}}
												InputProps={{
													...params.InputProps,
													id: 'nationality-autocomplete',
												}}
												disabled={loading}
												sx={{ color: 'white' }}
											/>
										)}
										onChange={(event, newValue) =>
											setUser({ ...user, nationality: newValue })
										}
										value={user.nationality}
									/>
								</FormControl>
							</Box>
							<Box sx={{ minWidth: 120 }}>
								<FormControl
									fullWidth
									sx={{
										'& .MuiInputBase-root': {
											backgroundColor: '#333',
											height: '4em',
											color: 'white',
										},
										'& .MuiSvgIcon-root': {
											color: 'white',
										},
									}}
								>
									<InputLabel htmlFor="position-select" sx={{ color: 'white' }}>
										Postion
									</InputLabel>
									<Select
										value={user.position}
										onChange={onChangeInput}
										label="Postion"
										inputProps={{
											name: 'position',
											id: 'position-select',
										}}
									>
										{positions.map((position, index) => (
											<MenuItem key={index} value={position}>
												{position}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Box>
							<Form.Submit type="submit">Sign Up</Form.Submit>
						</Form.InputGroup>
						<Form.Text>
							Already a user? <Form.Link to="/signin">Sign in now.</Form.Link>
						</Form.Text>
					</Form.Base>
				</Form>
			</Box>
		</>
	);
}
