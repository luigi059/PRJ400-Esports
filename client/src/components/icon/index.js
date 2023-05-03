import GitHubIcon from '@mui/icons-material/GitHub';
import React from 'react';
import { Container } from './styles/icon';

export default function Icon({ children, ...restProps }) {
	return <Container {...restProps}>{children}</Container>;
}

Icon.GitHub = function IconGitHub({ to }) {
	const style = {
		color: 'white',
		fontSize: '4rem',
		cursor: 'pointer',
	};
	return (
		<a href={to}>
			<GitHubIcon style={style} />
		</a>
	);
};
