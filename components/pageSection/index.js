import React, { memo } from 'react';
import styled from 'styled-components';

const C1 = styled.section`
  width: 100vw;
  margin: 0;
  padding: ${props => (props.padding ? props.padding : 0)};
  background-image: ${({ bg }) => (bg ? `url(${bg})` : 'unset')};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  z-index: 1;
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    background: ${({ mask }) => mask || 'unset'};
    content: '';
  }
`;

const C2 = styled.div`
  width: 100%;
  max-width: 1280px;
  padding: 2px;
  margin: auto;
  position: relative;
  z-index: 3;
`;

const PageSection = ({ children, ...rest }) => (
  <C1 {...rest}>
    <C2>{children}</C2>
  </C1>
);

export default memo(PageSection);
