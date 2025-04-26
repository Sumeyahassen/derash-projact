import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import { Audio } from "expo-av";

const WomenSafetyAlert = () => {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [alertStatus, setAlertStatus] = useState(
    "⚠ Press SOS in case of emergency!"
  );
  const soundRef = useRef(null);

  // Load the sound when component mounts
  useEffect(() => {
    async function loadSound() {
      const { sound } = await Audio.Sound.createAsync(
        require("./assets/eas-alarm-phone-alarm-262882.mp3")
      );
      soundRef.current = sound;
    }

    loadSound();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const sendAlert = async () => {
    setAlertStatus("🚨 Alert Sent! Authorities Notified");

    if (audioEnabled && soundRef.current) {
      try {
        await soundRef.current.replayAsync();
      } catch (error) {
        console.log("Error playing sound:", error);
      }
    }

    // In a real app, you would also send the alert to authorities here
    Alert.alert("Emergency Alert", "Your alert has been sent to authorities!");
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚨 Women Safety Alert System 🚨</Text>

      {/* SOS Button */}
      <TouchableOpacity style={styles.sosButton} onPress={sendAlert}>
        <Text style={styles.sosText}>🚫</Text>
      </TouchableOpacity>

      <Text style={styles.alertStatus}>{alertStatus}</Text>

      {/* Audio Toggle */}
      <View style={styles.audioControl}>
        <Text style={styles.audioLabel}>🔊 Alert Sound:</Text>
        <TouchableOpacity
          style={[styles.audioToggle, !audioEnabled && styles.audioToggleOff]}
          onPress={toggleAudio}
        >
          <Text style={styles.audioToggleText}>
            {audioEnabled ? "ON" : "OFF"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A1931",
    padding: 20,
  },
  innerContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#f4ba6f",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    color: "white",
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  sosButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  sosText: {
    color: "black",
    fontSize: 60,
    textAlign: "center",
  },
  alertStatus: {
    color: "white",
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  audioControl: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  audioLabel: {
    color: "white",
    fontSize: 16,
    marginRight: 10,
  },
  audioToggle: {
    width: 80,
    height: 40,
    backgroundColor: "green",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  audioToggleOff: {
    backgroundColor: "darkred",
  },
  audioToggleText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WomenSafetyAlert;
