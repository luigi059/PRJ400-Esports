import styled from 'styled-components/macro';

export const Inner = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: ${({ direction }) => direction};
	max-width: 1100px;
	margin: auto;
	width: 100%;
	@media (max-width: 1000px) {
		flex-direction: column;
	}
`;

export const Pane = styled.div`
	width: 50%;
	@media (max-width: 1000px) {
		width: 100%;
		padding: 0 45px;
		text-align: center;
	}
`;

export const Title = styled.h1`
	font-size: 50px;
	line-height: 1.1;
	margin-bottom: 8px;
	@media (max-width: 600px) {
		font-size: 35px;
	}
`;

export const SubTitle = styled.h2`
	font-size: 26px;
	font-weight: normal;
	line-height: normal;
	@media (max-width: 600px) {
		font-size: 18px;
	}
`;

export const Image = styled.img`
	max-width: 100%;
	height: auto;
`;

export const Item = styled.div`
	display: flex;
	padding: 50px 5%;
	color: white;
	overflow: hidden;
	border-bottom: 8px solid rgba(0, 0, 0, 0.3);
	width: 100%;
`;

export const Container = styled.div`
	margin-top: 5em;
	border-radius: 10px;
	width: 80%;
	background: linear-gradient(
		333.08deg,
		#000235 29.2%,
		#010f42 71.93%,
		#e40913 111.25%
	);
	@media (max-width: 1000px) {
		${Item}:last-of-type h2 {
			margin-bottom: 50px;
		}
	}
`;
