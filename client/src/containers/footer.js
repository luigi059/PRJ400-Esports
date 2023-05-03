import React from 'react';
import { Center, Footer } from '../components';
import IconContainer from './icons';

export default function FooterContainer() {
	return (
		<>
			<Footer>
				<Center>
					<Footer.SubText>Luigi Fernandez S00188563 PRJ400</Footer.SubText>
					<IconContainer />
				</Center>
			</Footer>
		</>
	);
}
