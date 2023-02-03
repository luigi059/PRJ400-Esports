import styled from "styled-components/macro";

export const Container = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

export const Item = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 1em;
  padding-bottom: 0;
  border-bottom: 1px solid white;
  &:last-child {
    border-bottom: none;
  }
  cursor: pointer;
`;

export const Logo = styled.img`
  height: 4em;
  width: 4em;
  filter: invert(100%) sepia(0%) saturate(7500%) hue-rotate(187deg)
    brightness(99%) contrast(103%);
  padding: 0.5em;
`;

export const Text = styled.p`
  color: white;
  font-size: 2em;
  text-align: center;
  line-height: normal;
  padding: 3px;
`;
