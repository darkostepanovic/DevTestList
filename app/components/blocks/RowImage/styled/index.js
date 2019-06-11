import styled from "styled-components";
import { Animated } from "react-native";

export const Wrapper = styled(Animated.View)`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  align-self: center;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;
