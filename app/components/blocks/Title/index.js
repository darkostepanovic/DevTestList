import React from "react";
import PropTypes from "prop-types";

import TitleText from '../../elements/TitleText';
import { Wrapper } from "./styled";

const Title = ({ children, fontWeight }) => (
  <Wrapper>
    <TitleText fontWeight={fontWeight}>{children}</TitleText>
  </Wrapper>
);

Title.Wrapper = Wrapper;

Title.propTypes = {
  children: PropTypes.string.isRequired,
  fontWeight: PropTypes.string
};

Title.defaultProps = {
  fontWeight: "normal"
};

export default Title;
