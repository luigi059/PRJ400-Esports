import React from 'react';
import { Centered } from './styles';

export default function Center({ children, ...restProps }) {
	return <Centered {...restProps}>{children}</Centered>;
}
