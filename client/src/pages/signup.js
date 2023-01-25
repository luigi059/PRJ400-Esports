import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "../components";
import HeaderContainer from "../containers/header";
import * as ROUTES from "../constants/routes";
import axios from "axios";

export default function SignUp() {
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5000/user/register", { ...user });
      history.push(ROUTES.PROFILE);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <>
      <HeaderContainer>
        <Form>
          <Form.Title>Sign Up</Form.Title>

          <Form.Base onSubmit={handleSignUp}>
            <Form.Input
              required
              placeholder="Name"
              name="name"
              value={user.name}
              onChange={onChangeInput}
            />
            <Form.Input
              required
              placeholder="Email address"
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
            <Form.Submit type="submit" data-testid="sign-up">
              Sign Up
            </Form.Submit>
          </Form.Base>

          <Form.Text>
            Already a user? <Form.Link to="/signin">Sign in now.</Form.Link>
          </Form.Text>
          <Form.TextSmall>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. Learn more.
          </Form.TextSmall>
        </Form>
      </HeaderContainer>
    </>
  );
}
