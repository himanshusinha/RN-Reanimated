import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export default function App() {
  const animatedValue = useSharedValue(1); // start visible
  const animatedHeight = useSharedValue(100);
  const animatedWidth = useSharedValue(100);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedValue.value,
      height: animatedHeight.value,
      width: animatedWidth.value,
    };
  });
  console.log('re render value');
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]} />

      <TouchableOpacity
        onPress={() => {
          if (animatedValue.value === 1) {
            animatedValue.value = withTiming(0.5, { duration: 1000 });
            animatedHeight.value = withSpring(100);
            animatedWidth.value = withSpring(100);
          } else {
            animatedValue.value = withTiming(1, { duration: 1000 });
            animatedHeight.value = withSpring(50);
            animatedWidth.value = withSpring(50);
          }
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Change Opacity</Text>
      </TouchableOpacity>
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
    backgroundColor: 'red',
    marginBottom: 20,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
  },
});
