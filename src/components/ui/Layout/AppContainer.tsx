import React from "react";
import styled from "styled-components";

export const DashContainer = (props: any) => {
  return <DashWrapper>{props.children}</DashWrapper>;
};

const DashWrapper = styled.div`
  height: 100vh;
  max-width: 1440px;
  margin: 0 auto;
  padding-left: 7rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media ${(props) => props.theme.size.small} {
    padding-left: 0;
  }
`;

export const AppContainer = (props: any) => {
  return <AppWrapper>{props.children}</AppWrapper>;
};

const AppWrapper = styled.div`
  height: 100vh;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
