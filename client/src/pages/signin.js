import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "../components";
import HeaderContainer from "../containers/header";
import * as ROUTES from "../constants/routes";
import axios from "axios";

export default function SignIn() {
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSignin = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5000/user/login", { ...user });
      history.push(ROUTES.PROFILE);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <>
      <HeaderContainer>
        <Form>
          <Form.Title>Sign In</Form.Title>

          <Form.Base onSubmit={handleSignin}>
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
          </Form.Base>

          <Form.Text>
            New to the E-Sports Hub?{" "}
            <Form.Link to="/signup">Sign up now.</Form.Link>
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
