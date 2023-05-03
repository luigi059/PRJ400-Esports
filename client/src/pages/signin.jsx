import { Box } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlexBetween, Form, Header, Loading } from '../components';
import * as ROUTES from '../constants/routes';
import logo from '../logo.png';

export default function SignIn() {
	const [user, setUser] = useState({
		email: '',
		password: '',
	});
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const onChangeInput = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	const handleSignin = async (event) => {
		setIsLoading(true);
		event.preventDefault();
		try {
			const res = axios.post(
				'https://prj400-esports.onrender.com/api/user/login',
				{
					...user,
				}
			);
			localStorage.setItem('token', (await res).data.accessToken);

			navigate(ROUTES.PROFILE);
		} catch (err) {
			alert(err.response.data.msg);
		}
	};

	return isLoading ? (
		<Loading />
	) : (
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
						<Form.Title>Sign In</Form.Title>

						<Form.InputGroup onSubmit={handleSignin}>
							<Form.Input
								required
								placeholder="Email address"
								name="email"
								onChange={onChangeInput}
							/>
							<Form.Input
								required
								type="password"
								autoComplete="off"
								placeholder="Password"
								name="password"
								onChange={onChangeInput}
							/>
							<Form.Submit type="submit" data-testid="sign-in">
								Sign In
							</Form.Submit>
						</Form.InputGroup>
						<Form.Text>
							New to E-Sportify?
							<Form.Link to="/signup"> Sign up now.</Form.Link>
						</Form.Text>
					</Form.Base>
				</Form>
			</Box>
		</>
	);
}
