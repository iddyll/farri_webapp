import React from "react";
import styled from "styled-components";

const searchTextBox = (props: any) => {
  return (
    <TextBox
      type="text"
      placeholder="STEAM ID / STEAM PROFILE"
      autoFocus
      {...props}
    />
  );
};

const TextBox = styled.input`
  width: 40rem;
  height: 3.25rem;
  background: #ffffff;
  border: 0.1875rem solid ${(props) => props.theme.colors.orange};
  border-radius: 3.125rem;
  margin: 0 auto;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: normal;
  padding-left: 1.5rem;
  color: #0a0a0a;

  @media ${(props) => props.theme.size.small} {
    width: 90vw;
    height: 2.5rem;
    border: 0.1rem solid ${(props) => props.theme.colors.orange};
    font-size: 0.85rem;
    padding-left: 1rem;
  }

  @media ${(props) => props.theme.size.medium} {
    width: 30rem;
    height: 2.5rem;
    border: 0.1rem solid ${(props) => props.theme.colors.orange};
    font-size: 0.85rem;
    padding-left: 1rem;
  }

  &::placeholder {
    color: #999;
  }

  &:focus {
    outline: none;
  }
`;

export default searchTextBox;