import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';

const SettingScreen = ({ navigation }) => {
  // Handle user logout
  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.replace('Home');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  // Navigate to Dashboard screen
  const navigateToDashboard = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      {/* Screen header */}
      <Text style={styles.header}>Settings</Text>

      {/* Logout button */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      {/* Dashboard navigation button */}
      <TouchableOpacity onPress={navigateToDashboard} style={styles.dashboardButton}>
        <Text style={styles.dashboardButtonText}>Go to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFCDEA',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#BC7FCD',
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
  },
  dashboardButton: {
    marginTop: 20,
    backgroundColor: '#BC7FCD',
    padding: 10,
    borderRadius: 5,
  },
  dashboardButtonText: {
    color: 'white',
    fontSize: 18,
  }
});

export default SettingScreen;
