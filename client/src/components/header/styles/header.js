import styled from "styled-components/macro";
import { Link as ReachRouterLink } from "react-router-dom";

export const Background = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.35),
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0.35)
    ),
    url(${({ src }) =>
        src ? `../images/misc/${src}.jpg` : "../images/misc/home-bg.jpg"})
      top left / cover no-repeat;
  @media (max-width: 1100px) {
    ${({ dontShowOnSmallViewPort }) =>
      dontShowOnSmallViewPort && `background: none;`}
  }
`;

export const Container = styled.div`
  display: flex;
  margin: 0 5em;
  height: 10em;
  justify-content: space-between;
  align-items: center;
  a {
    display: flex;
  }
`;

export const ButtonLink = styled(ReachRouterLink)`
  display: block;
  background-color: #9a0680;
  width: fit-content;
  height: fit-content;
  color: white;
  border: 0;
  font-size: 1.5em;
  border-radius: 3px;
  padding: 0.5em 1em;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    background: #f806cc;
  }
`;

export const Logo = styled.img`
  height: 4em;
  width: 14em;
`;

export const Group = styled.div`
  display: flex;
  align-items: center;
`;
