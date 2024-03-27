import React, { useState, useEffect, useRef } from "react";
import { Text, TouchableOpacity, View, ImageBackground, StyleSheet } from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import Physics from "./physics";
import SplashScreen from './components/SplashScreen';

export default function App() {
  const [splashScreenVisible, setSplashScreenVisible] = useState(true);
  const [welcome, setWelcome] = useState(true);
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [offset, setOffset] = useState(0); // State to track background image movement

  const gameEngineRef = useRef(null);

  const hideSplashScreen = () => {
    setSplashScreenVisible(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Update offset to move background image
      setOffset(prevOffset => prevOffset - 1.5); // Adjust speed by changing the value here
    }, 100); // Adjust the interval as needed for desired speed

    return () => clearInterval(interval);
  }, []);

  const image = require('./assets/background.png');
  const welcomeImage = require('./assets/startbackground.png');

  const handleScoreUpdate = () => {
    setScore(prevScore => prevScore + 1);
  };

  if (welcome) {
    return (
      <View style={styles.welcome}>
        <ImageBackground
        source={welcomeImage}
        resizeMode="cover"
        style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}
      />
        {splashScreenVisible && <SplashScreen onHide={hideSplashScreen} />}
        {!splashScreenVisible && (
          <>
            {/** 
            <Text style={styles.textWelcome}>
              Welcome Coyote Game! 
                {"\n"}
              Press the button to start the game!
            </Text>
            */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setWelcome(false);
                setRunning(true);
              }}
            >
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={{ position: "absolute", top: 0, left: offset, bottom: 0, right: 0 }}
      />
      {running && (
        <GameEngine
          ref={gameEngineRef}
          style={styles.gameEngine}
          systems={[Physics]}
          entities={entities()}
          running={running}
          onEvent={e => {
            switch (e.type) {
              case "game_over":
                setRunning(false);
                break;
              case "score":
                handleScoreUpdate();
                break;
              default:
                break;
            }
          }}
        />
      )}
      <View style={{ alignItems: "center" }}>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>
      {!running && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 30, color: "red" }}>Game Over</Text>
            <Text style={styles.scoreFinal}>Your Score: {score}</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setRunning(true);
              setScore(0);
            }}
          >
            <Text style={styles.buttonText}>Play Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  gameEngine: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  welcome: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "orange",
    paddingHorizontal: 50,
    paddingVertical: 20,
    marginTop: 20,
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 30,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 50,
  },
  scoreFinal: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  textWelcome: {
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
