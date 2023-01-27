import styled from "styled-components/macro";

export const Background = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr;
  height: 100vh;
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.35),
      rgba(0, 0, 0, 0.35),
      rgba(0, 0, 0, 0.35)
    ),
    url(${({ src }) =>
        src ? `../images/misc/${src}.jpg` : "../images/misc/bg-lg.svg"})
      top left / cover no-repeat;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RightBase = styled.div`
  height: 94%;
  width: 96%;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 8px;
  display: grid;
  grid-template-row: 1fr;
  padding: 2em;
`;

// To be Refactored
export const FirstProfile = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr;
  border-bottom: 1px solid white;
`;
export const InfoSection = styled.div``;
export const PlayerImgContainer = styled.div`
  position: relative;
  display: inline-block;
  overflow: hidden;
  margin: 0;
  border-radius: 8px;
`;
export const PlayerImg = styled.img`
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  min-height: 100%;
  min-width: 100%;
  transform: translate(-50%, -50%);
  padding: 1em;
`;
export const InfoTitle = styled.h1`
  color: #9a0680;
  padding-left: 1em;
  padding-bottom: 0.25em;
`;

export const SecondProfile = styled.div`
  display: flex;
  flex-direction: row;
`;
export const Section = styled.div`
  width: 50%;
  padding: 1em;
`;
export const SubSection = styled.div`
  height: 90%;
  width: 100%;
  border-radius: 8px;
  background-color: rgba(154, 6, 128, 0.1);
`;
export const MediaSection = styled.div`
  height: 90%;
  width: 100%;
  border-radius: 8px;
  background-color: rgba(154, 6, 128, 0.1);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const MediaSubSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Title = styled.h1`
  color: #9a0680;
  text-align: center;
`;
export const Logo = styled.img`
  height: 12.5em;
  min-width: 70%;
  cursor: pointer;
`;
export const Text = styled.p`
  color: white;
  font-size: 2em;
  padding-bottom: 1em;
  padding-left: 1em;
`;
export const RatingSection = styled.div``;
export const Rating = styled.div`
  display: grid;
  grid-template-row: 1fr 3fr 1fr;
`;
