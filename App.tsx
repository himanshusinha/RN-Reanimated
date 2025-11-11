import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export default function App() {
  const animatedValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(animatedValue.value, [0, 50, 100], [1, 0.5, 1]);
    const backgroundColor = interpolateColor(
      animatedValue.value,
      [0, 50, 100],
      ['red', 'orange', 'red'], // red -> orange -> red
    );
    const width = interpolate(
      animatedValue.value,
      [0, 50, 100],
      [100, 50, 100],
    );

    const height = interpolate(
      animatedValue.value,
      [0, 50, 100],
      [100, 50, 100],
    );
    return {
      transform: [{ translateX: animatedValue.value }],
      opacity,
      backgroundColor,
      width,
      height,
    };
  });

  const handlePress = () => {
    if (animatedValue.value === 0) {
      animatedValue.value = withTiming(100, { duration: 1000 });
    } else {
      animatedValue.value = withTiming(0, { duration: 1000 });
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]} />
      <View style={styles.button}>
        <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Start Interpolation</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    // backgroundColor removed so animated backgroundColor is visible
    marginBottom: 20,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 0.5,
    marginTop: 100,
  },
  buttonText: {
    fontSize: 16,
  },
});
