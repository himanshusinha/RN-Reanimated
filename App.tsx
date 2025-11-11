import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Directions,
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export default function App() {
  // Animated values
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const rotation = useSharedValue(0);

  // Animated style
  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      scale.value,
      [1, 1.5],
      ['orange', 'green'],
    );

    return {
      backgroundColor,
      transform: [
        { scale: scale.value },
        { translateX: translateX.value },
        { rotate: `${rotation.value}rad` },
      ],
    };
  });

  // Long press changes scale and color
  const longPressGesture = Gesture.LongPress()
    .minDuration(500)
    .onStart(() => {
      scale.value = withSpring(1.5);
    })
    .onEnd(() => {
      scale.value = withSpring(1);
    });

  // Fling gestures
  const flingLeftGesture = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(() => {
      translateX.value = withSpring(-100);
    });

  const flingRightGesture = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd(() => {
      translateX.value = withSpring(100);
    });

  // Rotation gesture
  const rotationGesture = Gesture.Rotation()
    .onUpdate(event => {
      rotation.value = event.rotation;
    })
    .onEnd(() => {
      rotation.value = withSpring(0);
    });

  // Pinch gesture for zoom
  const pinchGesture = Gesture.Pinch()
    .onUpdate(event => {
      scale.value = event.scale;
    })
    .onEnd(() => {
      scale.value = withSpring(1);
    });

  // Combine gestures (allow pinch + rotate + fling + long press)
  const combinedGesture = Gesture.Simultaneous(
    pinchGesture,
    rotationGesture,
    longPressGesture,
    flingLeftGesture,
    flingRightGesture,
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={combinedGesture}>
        <Animated.View style={[styles.box, animatedStyle]} />
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'orange',
    borderRadius: 10,
  },
});
