import styled from "styled-components/macro";
import { Link as ReachRouterLink } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  margin-top: 2em;
  flex-wrap: wrap;
`;

export const Break = styled.div`
  flex-basis: 100%;
  height: 0;
`;

export const Button = styled(ReachRouterLink)`
  display: flex;
  align-items: center;
  height: 4em;
  background: #9a0680;
  color: white;
  text-transform: uppercase;
  text-decoration: none;
  padding: 0 2em;
  font-size: 2em;
  border: 0;
  cursor: pointer;
  img {
    margin-left: 1em;
    filter: brightness(0) invert(1);
    width: 2em;
  }
  &:hover {
    background: #f806cc;
  }
`;

export const Text = styled.p`
  font-size: 2em;
  color: white;
  text-align: center;
`;
