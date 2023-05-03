import React from 'react';
import { Container, SubText } from './styles/footer';

export default function Footer({ children, ...restProps }) {
	return <Container {...restProps}>{children}</Container>;
}

Footer.SubText = function FooterSubText({ children, ...restProps }) {
	return <SubText {...restProps}>{children}</SubText>;
};
