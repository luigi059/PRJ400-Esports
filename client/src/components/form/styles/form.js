import { Link as ReachRouterLink } from 'react-router-dom';
import styled from 'styled-components/macro';

export const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 5px;
	margin: auto;
	height: calc(100vh - 10em);
	width: 100%;
`;

export const Base = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.75);
	height: calc(100vh - 10rem);
	width: 30rem;
	border-radius: 8px;
`;

export const InputGroup = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 0 1em;
`;

export const Row = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

export const Error = styled.div`
	background: #e87c03;
	border-radius: 4px;
	font-size: 14px;
	margin: 0 0 16px;
	color: white;
	padding: 15px 20px;
`;

export const Title = styled.h1`
	color: #fff;
	font-size: 1.5rem;
	font-weight: bold;
	margin-bottom: 1.5em;
`;

export const Text = styled.p`
	color: #737373;
	font-weight: 500;
	margin-top: 0.5em;
	margin-bottom: 0.5em;
	font-size: 13px;
	line-height: normal;
	color: #8c8c8c;
`;

export const Link = styled(ReachRouterLink)`
	color: #fff;
	text-decoration: none;
	&:hover {
		text-decoration: underline;
	}
`;

export const Input = styled.input`
	background: #333;
	border-radius: 4px;
	border: 0;
	color: #fff;
	height: 2.5em;
	margin: 0 0 1em 0;
	padding: 1em;
	width: 100%;
`;

export const TwoInput = styled.input`
	background: #333;
	border-radius: 4px;
	height: 2.5em;
	margin: 0 0.5em 1em 0.5em;
	padding: 1em;
	color: #fff;
	width: 100%;
	&:first-of-type {
		margin-left: 0;
	}
	&:last-of-type {
		margin-right: 0;
	}
`;

export const Submit = styled.button`
	background: #f806cc;
	border-radius: 4px;
	font-size: 1em;
	font-weight: bold;
	margin: 2em 0 0.8em;
	padding: 1em;
	border: 0;
	color: white;
	cursor: pointer;
	&:disabled {
		opacity: 0.5;
	}
`;

export const CheckBox = styled.input`
	appearance: none;
	width: 1em;
	height: 1em;
	border: 1px solid #ccc;
	border-radius: 3px;
	margin-right: 8px;
	outline: none;
	&:checked {
		background-color: purple;
	}
	&:hover {
		cursor: pointer;
	}
`;
