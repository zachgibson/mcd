import React, { Component, Fragment } from "react";
import {
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  Text
} from "react-native";
import { LinearGradient } from "expo";
import Animated, { Easing } from "react-native-reanimated";
let gucci = 0;
const {
  ScrollView,
  Value,
  call,
  Code,
  add,
  sub,
  View,
  interpolate,
  Extrapolate,
  abs,
  timing,
  Clock,
  set,
  block,
  cond,
  clockRunning,
  startClock,
  stopClock,
  debug,
  spring,
  multiply,
  greaterThan
} = Animated;
const { width, height } = Dimensions.get("window");
const TILE_WIDTH = 136;
const TILE_HEIGHT = 232;

export default class Foo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      layout: null
    };

    // this.xyVal = add(
    //   abs(sub(props.left + TILE_WIDTH / 2 - width / 2, props.x)),
    //   abs(sub(props.top + TILE_HEIGHT / 2 - height / 2, props.y))
    // );

    // this.xyVal = add(
    //     abs(sub(props.left + TILE_WIDTH / 2 - width / 2, props.x)),
    //     abs(
    //         multiply(
    //             sub(props.top + TILE_HEIGHT / 2 - height / 2, props.y),
    //             1.75
    //         )
    //     )
    // );

    // this.scale = cond(
    //     greaterThan(props.deltaY, props.deltaX),
    //     interpolate(this.xyVal, {
    //         inputRange: [-(24 + TILE_HEIGHT / 2), 0, 24 + TILE_HEIGHT / 2],
    //         outputRange: [1, 1.1, 1],
    //         extrapolate: Extrapolate.CLAMP
    //     }),
    //     interpolate(this.xyVal, {
    //         inputRange: [-(24 + TILE_WIDTH / 2), 0, 24 + TILE_WIDTH / 2],
    //         outputRange: [1, 1.1, 1],
    //         extrapolate: Extrapolate.CLAMP
    //     })
    // );

    // this.opacity = cond(
    //     greaterThan(props.deltaY, props.deltaX),
    //     interpolate(this.xyVal, {
    //         inputRange: [-(24 + TILE_HEIGHT / 2), 0, 24 + TILE_HEIGHT / 2],
    //         outputRange: [0.5, 1, 0.5],
    //         extrapolate: Extrapolate.CLAMP
    //     }),
    //     interpolate(this.xyVal, {
    //         inputRange: [-(24 + TILE_WIDTH / 2), 0, 24 + TILE_WIDTH / 2],
    //         outputRange: [0.5, 1, 0.5],
    //         extrapolate: Extrapolate.CLAMP
    //     })
    // );

    // this.borderOpacity = cond(
    //     greaterThan(props.deltaY, props.deltaX),
    //     interpolate(this.xyVal, {
    //         inputRange: [-(24 + TILE_HEIGHT / 2), 0, 24 + TILE_HEIGHT / 2],
    //         outputRange: [0, 1, 0],
    //         extrapolate: Extrapolate.CLAMP
    //     }),
    //     interpolate(this.xyVal, {
    //         inputRange: [-(24 + TILE_WIDTH / 2), 0, 24 + TILE_WIDTH / 2],
    //         outputRange: [0, 1, 0],
    //         extrapolate: Extrapolate.CLAMP
    //     })
    // );

    // this.textOpacity = cond(
    //     greaterThan(props.deltaY, props.deltaX),
    //     interpolate(this.xyVal, {
    //         inputRange: [-(24 + TILE_HEIGHT / 2), 0, 24 + TILE_HEIGHT / 2],
    //         outputRange: [0, 1, 0],
    //         extrapolate: Extrapolate.CLAMP
    //     }),
    //     interpolate(this.xyVal, {
    //         inputRange: [-(24 + TILE_WIDTH / 2), 0, 24 + TILE_WIDTH / 2],
    //         outputRange: [0, 1, 0],
    //         extrapolate: Extrapolate.CLAMP
    //     })
    // );

    this.logBoi = ([xyVal]) => {
      // console.log(xyVal);
    };
  }

  setupValues = ({ width, height, x, y }) => {
    // alert(JSON.stringify(layout));

    // this.xyVal = add(
    //   abs(sub(props.left + TILE_WIDTH / 2 - width / 2, props.x)),
    //   abs(sub(props.top + TILE_HEIGHT / 2 - height / 2, props.y))
    // );

    this.setState({ layout: { width, height, x, y } });

    this.xyVal = add(
      abs(sub(x + TILE_WIDTH / 2 - width * 2, this.props.x)),
      abs(sub(y + TILE_HEIGHT / 2 - height * 2, this.props.y))
    );

    const wat = TILE_WIDTH / 2 + TILE_HEIGHT / 2;

    this.scale = interpolate(this.xyVal, {
      inputRange: [-80, 0, 80],
      outputRange: [1, 1.1, 1],
      extrapolate: Extrapolate.CLAMP
    });

    this.opacity = interpolate(this.xyVal, {
      inputRange: [-80, 0, 80],
      outputRange: [0.5, 1, 0.5],
      extrapolate: Extrapolate.CLAMP
    });

    this.borderOpacity = interpolate(this.xyVal, {
      inputRange: [-80 * 0.5, -80 * 0.25, 0, 80 * 0.25, 80 * 0.5],
      outputRange: [0, 1, 1, 1, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.textOpacity = interpolate(this.xyVal, {
      inputRange: [-80 * 0.475, -80 * 0.25, 0, 80 * 0.25, 80 * 0.475],
      outputRange: [0, 1, 1, 1, 0],
      extrapolate: Extrapolate.CLAMP
    });
  };

  render() {
    const { top, left, imageSrc, firstName, lastName } = this.props;

    if (this.state.layout !== null) {
      return (
        <Fragment>
          <View
            style={{
              overflow: "hidden",
              margin: 16,
              width: TILE_WIDTH,
              height: TILE_HEIGHT,
              backgroundColor: "black",
              borderRadius: 8,
              transform: [
                {
                  scale: this.scale
                }
              ],
              opacity: this.opacity
            }}
          >
            <TouchableWithoutFeedback style={[StyleSheet.absoluteFill]}>
              <Fragment>
                <Image style={[StyleSheet.absoluteFill]} source={imageSrc} />
                <LinearGradient
                  colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.75)"]}
                  style={StyleSheet.absoluteFill}
                />
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "flex-end",
                    paddingBottom: 16,
                    opacity: this.textOpacity
                  }}
                >
                  <Text style={styles.name}>
                    {firstName && firstName.toUpperCase()}
                  </Text>
                  <Text style={styles.name}>
                    {lastName && lastName.toUpperCase()}
                  </Text>
                </View>
              </Fragment>
            </TouchableWithoutFeedback>
            <View
              pointerEvents="none"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "white",
                opacity: this.borderOpacity
              }}
            />
          </View>
        </Fragment>
      );
    }

    return (
      <View
        onLayout={e => {
          this.setupValues(e.nativeEvent.layout);
        }}
        style={{
          overflow: "hidden",
          margin: 16,
          width: TILE_WIDTH,
          height: TILE_HEIGHT,
          borderWidth: 1,
          borderStyle: "dashed",
          borderColor: "#333",
          borderRadius: 8
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  name: {
    fontWeight: "500",
    color: "white"
  }
});
