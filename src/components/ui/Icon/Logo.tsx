import React from "react";
import styled from "styled-components";

import image from "../../../assets/images/logo.png";

interface IProps {
  height: string;
}

const Logo = () => {
  return (
    <Wrapper>
      <img src={image} alt="farri logo" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  img {
    height: 56px;

    @media ${(props) => props.theme.size.small} {
      height: 32px;
    }
  }
`;

export default Logo;