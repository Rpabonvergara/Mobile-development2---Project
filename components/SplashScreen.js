import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';


const SplashScreen = ({ onHide }) => {
  const opacity = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        onHide && onHide(); // Callback to notify that the splash screen has been hidden
      });

    }, 1000); // Splash screen disappears after 2000 milliseconds

    return () => clearTimeout(timer); 
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Animated.View style={[styles.textContainer, { transform: [{ translateY: position }] }]}>
        
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    position: 'absolute',
  },
  text: {
    fontSize: 44,
    fontWeight: 'bold',
    color: 'blue', 
  },
});

export default SplashScreen;
