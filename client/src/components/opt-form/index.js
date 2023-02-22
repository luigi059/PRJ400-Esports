import { ChevronRightOutlined } from '@mui/icons-material';
import React from 'react';
import { Break, Button, Container, Text } from './styles/opt-form';

export default function OptForm({ children, ...restProps }) {
	return <Container {...restProps}>{children}</Container>;
}

OptForm.Button = function OptFormButton({ children, ...restProps }) {
	return (
		<Button {...restProps}>
			{children} <ChevronRightOutlined fontSize="medium" />
		</Button>
	);
};

OptForm.Text = function OptFormText({ children, ...restProps }) {
	return <Text {...restProps}>{children}</Text>;
};

OptForm.Break = function OptFormBreak({ ...restProps }) {
	return <Break {...restProps} />;
};
