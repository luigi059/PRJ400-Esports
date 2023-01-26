import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "../components";
import HeaderContainer from "../containers/header";
import * as ROUTES from "../constants/routes";
import axios from "axios";

export default function SignUp() {
  const history = useHistory();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    nationality: "",
    position: "",
    discoverable: "",
  });

  // Changes state on the fly
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
              placeholder="First Name"
              name="firstName"
              value={user.firstName}
              onChange={onChangeInput}
            />
            <Form.Input
              required
              placeholder="Last Name"
              name="lastName"
              value={user.lastName}
              onChange={onChangeInput}
            />
            <Form.Input
              required
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
            <Form.Input
              required
              placeholder="Date of Birth"
              name="dob"
              value={user.dob}
              onChange={onChangeInput}
            />
            <Form.Input
              required
              placeholder="Nationality"
              name="nationality"
              value={user.nationality}
              onChange={onChangeInput}
            />
            <Form.Input
              required
              placeholder="Position"
              name="position"
              value={user.dob}
              onChange={onChangeInput}
            />
            <Form.Input
              required
              placeholder="Discoverable"
              name="discoverable"
              value={user.dob}
              onChange={onChangeInput}
            />
          </Form.Base>
          <Form.Submit type="submit" data-testid="sign-up">
            Sign Up
          </Form.Submit>

          <Form.Text>
            Already a user? <Form.Link to="/signin">Sign in now.</Form.Link>
          </Form.Text>
        </Form>
      </HeaderContainer>
    </>
  );
}
