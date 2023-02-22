import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '../components';
import * as ROUTES from '../constants/routes';
import HeaderContainer from '../containers/header';

export default function SignIn() {
	const navigate = useNavigate();
	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	const onChangeInput = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	const handleSignin = async (event) => {
		event.preventDefault();
		try {
			const res = axios.post('http://localhost:5000/api/user/login', {
				...user,
			});

			localStorage.setItem('token', (await res).data.accessToken);

			navigate(ROUTES.PROFILE);
		} catch (err) {
			alert(err.response.data.msg);
		}
	};

	return (
		<>
			<HeaderContainer>
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
							New to the E-Sports Hub?{' '}
							<Form.Link to="/signup">Sign up now.</Form.Link>
						</Form.Text>
					</Form.Base>
				</Form>
			</HeaderContainer>
		</>
	);
}
