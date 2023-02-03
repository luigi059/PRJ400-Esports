import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Form } from "../components";
import HeaderContainer from "../containers/header";
import * as ROUTES from "../constants/routes";

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

  const onCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setUser({ ...user, [name]: checked });
    console.log(user.discoverable);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    console.log(user);
    if (user.discoverable === "") setUser({ ...user, discoverable: false });
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
          <Form.Base>
            <Form.Title>Sign Up</Form.Title>
            <Form.InputGroup onSubmit={handleSignUp}>
              <Form.Row>
                <Form.TwoInput
                  required
                  placeholder="First Name"
                  name="firstName"
                  value={user.firstName}
                  onChange={onChangeInput}
                />
                <Form.TwoInput
                  required
                  placeholder="Last Name"
                  name="lastName"
                  value={user.lastName}
                  onChange={onChangeInput}
                />
              </Form.Row>
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
              <Form.Text>Date of Birth</Form.Text>
              <Form.Input
                required
                type="date"
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
                value={user.position}
                onChange={onChangeInput}
              />
              <Form.Row>
                <Form.CheckBox
                  type="checkbox"
                  name="discoverable"
                  value={user.discoverable}
                  onChange={onCheckboxChange}
                />
                <Form.Text>Be discovered by the search database</Form.Text>
              </Form.Row>
              <Form.Submit type="submit">Sign Up</Form.Submit>
            </Form.InputGroup>
            <Form.Text>
              Already a user? <Form.Link to="/signin">Sign in now.</Form.Link>
            </Form.Text>
          </Form.Base>
        </Form>
      </HeaderContainer>
    </>
  );
}
