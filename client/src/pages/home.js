import React from "react";
import { Feature, OptForm } from "../components";
import HeaderContainer from "../containers/header";
import * as ROUTES from "../constants/routes";

export default function Home() {
  return (
    <>
      <HeaderContainer>
        <Feature>
          <Feature.Title>E-Sports Hub</Feature.Title>
          <Feature.SubTitle>
            The Ultimate Application in the World of E-Sports
          </Feature.SubTitle>
          <OptForm>
            <OptForm.Button to={ROUTES.SIGN_UP}>Try it now</OptForm.Button>
            <OptForm.Break />
            <OptForm.Text>Ready to Enter the World of E-Sports?.</OptForm.Text>
          </OptForm>
        </Feature>
      </HeaderContainer>
    </>
  );
}
