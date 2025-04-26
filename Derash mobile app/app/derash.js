import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
  ScrollView,
  Alert,
} from "react-native";
import { Audio } from "expo-av";
import MapView from "react-native-maps";

const DerashApp = () => {
  const [language, setLanguage] = useState("en");
  const [isTrackingEnabled, setIsTrackingEnabled] = useState(false);
  const [isProtectionActive, setIsProtectionActive] = useState(false);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const soundRef = useRef(null);

  const translations = {
    en: {
      title: "Derash - Protecting Public Transport Users",
      alertStatus: "Press SOS in case of emergency",
      trackingLabel: "Enable Bus Tracking",
      mapText: "Bus tracking map will appear here...",
      protectionBtn: "Activate Theft Protection",
      theftStatusOff: "Protection is OFF",
      theftStatusOn: "✅ Theft Protection Activated!",
      messageTitle: "Send Message to Transport Bureau",
      sendBtn: "Send",
      messageSent:
        "📩 Message sent to Transport Bureau. Waiting for response...",
      messageResponse:
        "✅ Transport Bureau: We received your request and are taking action.",
    },
    am: {
      title: "ደራሽ - የህዝብ ትራንስፖርት ደህንነት",
      alertStatus: "አደጋ ሲደርስ ☝️ ይጫኑ",
      trackingLabel: "የባስ መከታተያ ይግቡ",
      mapText: "የባስ አቅጣጫ ካርታ እዚህ ይታያል...",
      protectionBtn: "የማስነሳት መከላከያን ያንቁ",
      theftStatusOff: "መከላከያ ጠፍቷል",
      theftStatusOn: "✅ የማስነሳት መከላከያ ተነስቷል!",
      messageTitle: "መልዕክት ወደ ትራንስፖርት ቢሮ ላክ",
      sendBtn: "ላክ",
      messageSent: "📩 መልዕክት ተልኳል። ምላሽ እየጠበቁ ነው...",
      messageResponse: "✅ ትራንስፖርት ቢሮ፡ ጥያቄዎን ተቀብለናል እና እርምጃ እየወሰድን ነው።",
    },
  };

  const t = translations[language];

  const playAlertSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("./assets/alarm.mp3")
      );
      soundRef.current = sound;
      await sound.playAsync();
    } catch (error) {
      console.log("Error playing sound:", error);
    }
  };

  const sendAlert = () => {
    playAlertSound();
    Alert.alert("Emergency Alert", "Authorities have been notified!");
  };

  const toggleTracking = () => {
    setIsTrackingEnabled((previousState) => !previousState);
  };

  const activateTheftProtection = () => {
    setIsProtectionActive(!isProtectionActive);
  };

  const sendMessage = () => {
    if (message.trim() === "") {
      Alert.alert("Error", "Please enter a message");
      return;
    }

    setResponse(t.messageSent);
    setTimeout(() => {
      setResponse(t.messageResponse);
    }, 2000);
    setMessage("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.languageSelector}>
        <TouchableOpacity
          style={[styles.langButton, language === "en" && styles.activeLang]}
          onPress={() => setLanguage("en")}
        >
          <Text>English</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.langButton, language === "am" && styles.activeLang]}
          onPress={() => setLanguage("am")}
        >
          <Text>Amharic</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{t.title}</Text>

      <TouchableOpacity style={styles.sosButton} onPress={sendAlert}>
        <Text style={styles.sosText}>SOS</Text>
      </TouchableOpacity>

      <Text style={styles.alertStatus}>{t.alertStatus}</Text>

      <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>{t.trackingLabel}</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isTrackingEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleTracking}
          value={isTrackingEnabled}
        />
      </View>

      <View style={styles.mapContainer}>
        {isTrackingEnabled ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 9.0054,
              longitude: 38.7636,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        ) : (
          <Text style={styles.mapText}>{t.mapText}</Text>
        )}
      </View>

      <TouchableOpacity
        style={[
          styles.protectionButton,
          isProtectionActive && styles.activeProtection,
        ]}
        onPress={activateTheftProtection}
      >
        <Text style={styles.buttonText}>{t.protectionBtn}</Text>
      </TouchableOpacity>

      <Text style={styles.statusText}>
        {isProtectionActive ? t.theftStatusOn : t.theftStatusOff}
      </Text>

      <View style={styles.messageContainer}>
        <Text style={styles.messageTitle}>{t.messageTitle}</Text>
        <TextInput
          style={styles.messageInput}
          multiline
          numberOfLines={4}
          value={message}
          onChangeText={setMessage}
          placeholder="Describe the issue..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.buttonText}>{t.sendBtn}</Text>
        </TouchableOpacity>
        {response ? <Text style={styles.responseText}>{response}</Text> : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#0A1931",
    padding: 20,
    alignItems: "center",
  },
  languageSelector: {
    flexDirection: "row",
    marginBottom: 20,
    alignSelf: "flex-end",
  },
  langButton: {
    padding: 8,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: "#f4f4f4",
  },
  activeLang: {
    backgroundColor: "#f4ba6f",
  },
  title: {
    fontSize: 22,
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  sosButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  sosText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  alertStatus: {
    color: "white",
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#1D5B79",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    justifyContent: "space-between",
  },
  toggleLabel: {
    color: "white",
    fontSize: 16,
  },
  mapContainer: {
    height: 200,
    width: "100%",
    backgroundColor: "#1D5B79",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
  },
  mapText: {
    color: "white",
    textAlign: "center",
  },
  protectionButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    marginBottom: 10,
  },
  activeProtection: {
    backgroundColor: "darkgreen",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  statusText: {
    color: "white",
    marginBottom: 20,
  },
  messageContainer: {
    width: "100%",
    backgroundColor: "#1D5B79",
    padding: 15,
    borderRadius: 10,
  },
  messageTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  messageInput: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textAlignVertical: "top",
    minHeight: 100,
  },
  sendButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  responseText: {
    color: "white",
    marginTop: 10,
  },
});

export default DerashApp;
