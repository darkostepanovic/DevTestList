import React, { Component } from "react";
import PropTypes from "prop-types";
import { Animated } from "react-native";
import { Image } from "react-native-elements/src/index";
import { Wrapper } from "./styled";

const AnimatedImage = Animated.createAnimatedComponent(Image);

class RowImage extends Component {
  state = {
    fadeAnim: new Animated.Value(0)
  };

  componentDidMount() {
    Animated.sequence([
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 1000 // this value could be passed as prop to make component more reusable
      }),
      Animated.delay(1000),
      Animated.timing(this.state.fadeAnim, {
        toValue: 0,
        duration: 1000 // this value could be passed as prop to make component more reusable
      })
    ]).start();
  }

  render() {
    let { fadeAnim } = this.state;
    const { uri, style } = this.props;

    return (
      <Wrapper>
        <AnimatedImage
          source={{ uri }}
          style={{
            opacity: fadeAnim,
            backgroundColor: "transparent",
            ...style
          }}
          placeholderStyle={{
              backgroundColor: 'transparent'
          }}
        />
      </Wrapper>
    );
  }
}

RowImage.propTypes = {
  uri: PropTypes.string.isRequired,
  style: PropTypes.shape({})
};

RowImage.defaultProps = {
  style: {}
};

RowImage.Wrapper = Wrapper;
RowImage.AnimatedImage = AnimatedImage;

export default RowImage;
