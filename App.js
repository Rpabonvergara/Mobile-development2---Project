import React, { useState, useEffect, useRef } from "react";
import { Text, TouchableOpacity, View, Image, ImageBackground, StyleSheet } from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import Physics from "./physics";
import SplashScreen from './components/SplashScreen';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useFonts, Kanit_400Regular } from '@expo-google-fonts/kanit';

export default function App() {
  const [splashScreenVisible, setSplashScreenVisible] = useState(true);
  const [welcome, setWelcome] = useState(true);
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [offset, setOffset] = useState(0); // State to track background image movement
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volumeIcon, setVolumeIcon] = useState("md-volume-high"); // State to manage volume icon
  const gameEngineRef = useRef(null);
  const [fontsLoaded] = useFonts({
    Kanit_400Regular,
  });
  const hideSplashScreen = () => {
    setSplashScreenVisible(false);
  };

  useEffect(() => {
    if (!isPlaying) { // Check if sound is not already playing
      loadSound();
    }

    const interval = setInterval(() => {
      // Update offset to move background image
      setOffset(prevOffset => prevOffset - 1.5); // Adjust speed by changing the value here
    }, 100); // Adjust the interval as needed for desired speed

    return () => {
      clearInterval(interval);
      unloadSound();
    };
  }, [isPlaying]);

  async function loadSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/the-roadrunner.mp3')
    );
    setSound(sound);

    // Configure the sound to loop when it finishes
    sound.setOnPlaybackStatusUpdate(status => {
      if (status.didJustFinish) {
        sound.replayAsync(); // Replay the sound when it finishes
      }
    });

    console.log('Playing Sound');
    await sound.playAsync();
    setIsPlaying(true);
  }

  async function unloadSound() {
    if (sound) {
      console.log('Unloading Sound');
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
    }
  }

  async function stopSound() {
    if (sound) {
      console.log('Stopping Sound');
      await sound.stopAsync();
      console.log('Sound Stopped');
    }
  }

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/the-roadrunner.mp3')
    );
    setSound(sound);
    console.log('Playing Sound');
    await sound.playAsync();
  }

  async function toggleSound() {
    if (isPlaying) {
      await stopSound();
      setVolumeIcon("md-volume-mute-sharp");
      setIsPlaying(true);
    } else {
      if (!sound) {
        await playSound();
        setVolumeIcon("md-volume-high");
        setIsPlaying(true);
      }
    }
  }


  const handleScoreUpdate = () => {
    setScore(prevScore => prevScore + 1);
  };

  if (welcome) {
    return (
      <View style={styles.welcome}>
        <ImageBackground
          source={require('./assets/startbackground.png')}
          resizeMode="cover"
          style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}
        />
        {splashScreenVisible && <SplashScreen onHide={hideSplashScreen} />}
        {!splashScreenVisible && (
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setWelcome(false);
                setRunning(true);
              }}
            >
              <Text style={{
                color: "white",
                fontSize: 30,
                fontFamily: 'Kanit_400Regular',
              }}>Start</Text>
            </TouchableOpacity>
            <View style={styles.audioControl}>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={toggleSound}
              >
                <Ionicons name={volumeIcon} size={24} color="white" />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/background.png')}
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
        <Text style={{
          fontSize: 25,
          fontFamily: 'Kanit_400Regular',
          color: "white",
          marginTop: 80,
          marginBottom: -80,
          marginRight: 210,
        }}>Score: {score}</Text>
      </View>
      {!running && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            fontFamily: 'Kanit_400Regular',
          }}
        >
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 30, color: "red", fontFamily: 'Kanit_400Regular' }}>Game Over</Text>
            <Text style={{
              fontSize: 20,
              marginTop: 20,
              marginLeft: 6,
              fontFamily: 'Kanit_400Regular',
              color: "white",
            }}>Your Score: {score}</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setRunning(true);
              setScore(0);
            }}
          >
            <Text style={{
              color: "white",
              fontSize: 30,
              fontFamily: 'Kanit_400Regular',
            }}>Play Again</Text>
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
    borderRadius: 10,
  },
  audioControl: {
    position: 'absolute',
    top: 100,
    right: 10,
    zIndex: 1,
  },
  iconContainer: {
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 10,
    color: 'white',
  },
});