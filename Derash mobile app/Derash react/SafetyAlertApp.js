import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Image,
  Alert,
} from "react-native";
import { Audio } from "expo-av";

const SafetyAlertApp = () => {
  const [isActivated, setIsActivated] = useState(false);
  const [alertSettings, setAlertSettings] = useState({
    attackAlert: true,
    locationSharing: true,
    emergencyContacts: true,
    soundAlert: true,
    vibration: true,
  });

  const toggleActivation = () => {
    setIsActivated((prev) => !prev);
  };

  const toggleSetting = (setting) => {
    setAlertSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleSendAlert = async () => {
    if (alertSettings.soundAlert) {
      const { sound } = await Audio.Sound.createAsync(
        require("./assets/alert.mp3")
      );
      await sound.playAsync();
    }

    Alert.alert(
      "Alert Sent!",
      "Authorities and emergency contacts have been notified."
    );
  };

  return (
    <View style={styles.container}>
      {/* Derash Logo */}
      <Image source={require("./assets/logo.png")} style={styles.logo} />

      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Theft & Women Protection</Text>
      </View>

      {/* Thematic Image */}
      <Image
        source={require("./assets/alertImage.png")}
        style={styles.alertImage}
      />

      {/* Main Activation Card */}
      <View style={styles.activationCard}>
        <Text style={styles.activationTitle}>Women's Attack Alert</Text>

        <View style={styles.activationRow}>
          <Text style={styles.activationStatus}>
            {isActivated ? "Activated" : "Deactivated"}
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#ff4d6d" }}
            thumbColor={isActivated ? "#fff" : "#f4f3f4"}
            onValueChange={toggleActivation}
            value={isActivated}
          />
        </View>
      </View>

      {/* Alert Settings Section */}
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Alert settings</Text>

        {Object.entries(alertSettings).map(([key, value]) => (
          <View key={key} style={styles.settingItem}>
            <Text style={styles.settingText}>
              {key.replace(/([A-Z])/g, " $1")}
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#ff4d6d" }}
              thumbColor={value ? "#fff" : "#f4f3f4"}
              onValueChange={() => toggleSetting(key)}
              value={value}
            />
          </View>
        ))}
      </View>

      {/* Emergency Button */}
      <TouchableOpacity
        style={[
          styles.emergencyButton,
          isActivated && styles.emergencyButtonActive,
        ]}
        disabled={!isActivated}
        onPress={handleSendAlert}
      >
        <Text style={styles.emergencyButtonText}>SEND ALERT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff0f3",
    padding: 20,
  },
  logo: {
    height: 50,
    width: 150,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 10,
  },
  alertImage: {
    width: "100%",
    height: 160,
    borderRadius: 15,
    marginBottom: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff4d6d",
  },
  activationCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  activationTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#495057",
    marginBottom: 15,
  },
  activationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  activationStatus: {
    fontSize: 16,
    color: "#6c757d",
  },
  settingsSection: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#495057",
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  settingText: {
    fontSize: 16,
    color: "#495057",
    textTransform: "capitalize",
  },
  emergencyButton: {
    backgroundColor: "#adb5bd",
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  emergencyButtonActive: {
    backgroundColor: "#ff4d6d",
  },
  emergencyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SafetyAlertApp;
