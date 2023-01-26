import styled from "styled-components/macro";

export const Container = styled.div`
  height: calc(100vh - 10em);
  display: flex;
  flex-direction: column;
  border-bottom: 8px solid #222;
  text-align: center;
  padding: 15em 4em;
`;

export const Title = styled.h1`
  color: white;
  max-width: 60em;
  font-size: 5em;
  font-weight: 500;
  margin: auto;
`;

export const SubTitle = styled.h2`
  color: white;
  font-size: 2.5em;
  font-weight: normal;
  margin: 1.5em auto;
`;
