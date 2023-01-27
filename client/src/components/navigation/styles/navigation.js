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
  height: 25px;
  width: 25px;
  filter: invert(100%) sepia(0%) saturate(7500%) hue-rotate(187deg)
    brightness(99%) contrast(103%);
  padding: 3px;
`;

export const Text = styled.p`
  color: white;
  font-size: 12px;
  text-align: center;
  line-height: normal;
  padding: 3px;
`;
