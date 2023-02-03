import styled from "styled-components/macro";

export const Container = styled.div``;

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
  height: 15em;
  min-width: 70%;
  cursor: pointer;
`;
export const Text = styled.p`
  color: white;
  font-size: 2em;
  padding-bottom: 1em;
  padding-left: 1em;
`;
export const RatingSection = styled.div`
  display: flex;
`;
export const RatingSubSection = styled.div`
  flex-grow: 1;
  margin-left: 8em;
`;
export const Rating = styled.div`
  display: grid;
  grid-template-rows: 1fr 3fr 1fr;
`;
export const RatingText = styled.p`
  color: white;
  font-size: 2em;
  padding: 1px;
`;

export const InboxSection = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 4em;
`;
