import React from 'react';
import { Center, Feature, OptForm } from '../components';
import * as ROUTES from '../constants/routes';
import FaqsContainer from '../containers/faqs';
import FooterContainer from '../containers/footer';
import HeaderContainer from '../containers/header';
import JumbotronContainer from '../containers/jumbotron';

export default function Home() {
	return (
		<>
			<HeaderContainer>
				<Feature>
					<Feature.Title>E-Sportify</Feature.Title>
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
			<Center>
				<JumbotronContainer />
			</Center>
			<FaqsContainer />
			<FooterContainer />
		</>
	);
}
