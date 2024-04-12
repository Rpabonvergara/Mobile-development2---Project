import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, Image, StyleSheet } from 'react-native';
import { useFonts, Kanit_400Regular } from '@expo-google-fonts/kanit'


const SplashScreen = ({ onHide }) => {
  const opacity = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.Value(0)).current;
  const [fontsLoaded] = useFonts({
    Kanit_400Regular,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        onHide && onHide(); // Callback to notify that the splash screen has been hidden
      });

    }, 5000); // Splash screen disappears after 2000 milliseconds

    return () => clearTimeout(timer);
  }, []);
  if (!fontsLoaded) {
    // Font not loaded yet, render nothing or a loading indicator
    return null;
  }
  if (!fontsLoaded) {
    // Font not loaded yet, render nothing or a loading indicator
    return null;
  }

  return (
    <Animated.View style={{ opacity, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View style={[styles.textContainer, { transform: [{ translateY: position }] }]}>
      <Image source={require('../assets/coyote2.gif')} style={{
          position: "absolute",
          height: 150,
          width: 150,
          justifyContent: "center",
          alignItems: "center",
          resizeMode: "contain",
          marginTop: 120,
        }} />
        <Text style={{
          fontSize: 40,
          textAlign: "center",
          color: "white",
          fontFamily: 'Kanit_400Regular',
        }}>Coyote vs RoadRunner</Text>

        <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
          <Text style={{
            fontSize: 12,
            color: "white",
            fontFamily: 'Kanit_400Regular',
            marginBottom: -200,
          }}>v1</Text>
        </View>
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
    fontSize: 30,
    textAlign: "center",
    color: "white",
    fontFamily: 'Kanit_400Regular',
  },
});

export default SplashScreen;
