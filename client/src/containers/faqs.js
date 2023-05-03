import React from 'react';
import Accordion from '../components/accordion';
import OptForm from '../components/opt-form';
import * as ROUTES from '../constants/routes';
import faqsData from '../fixtures/faqs.json';

export default function FaqsContainer() {
	return (
		<Accordion>
			<Accordion.Title>Frequently Asked Questions</Accordion.Title>
			<Accordion.Frame>
				{faqsData.map((item) => (
					<Accordion.Item key={item.id}>
						<Accordion.Header>{item.header}</Accordion.Header>
						<Accordion.Body>{item.body}</Accordion.Body>
					</Accordion.Item>
				))}
			</Accordion.Frame>

			<OptForm>
				<OptForm.Button to={ROUTES.SIGN_IN}>Try it now</OptForm.Button>
				<OptForm.Break />
				<OptForm.Text>Ready to Enter the World of E-Sports?</OptForm.Text>
			</OptForm>
		</Accordion>
	);
}
