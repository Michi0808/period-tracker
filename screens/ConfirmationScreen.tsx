import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

const ConfirmationScreen = ({ route, navigation }) => {
  // Extracting parameters
  const { lastPeriodDate, periodDuration, cycleLength } = route.params;
  const formattedDate = new Date(lastPeriodDate);

  // Handle confirmation
  const handleConfirm = async () => {
    const userId = auth().currentUser?.uid;

    // User data to save in Firestore
    const userData = {
      lastPeriodDate: formattedDate,
      periodDuration,
      cycleLength,
      createdAt: firestore.FieldValue.serverTimestamp(),
      diffDays: 0
    };

    try {
      // Save user data
      await firestore()
        .collection('users')
        .doc(userId)
        .set(userData, { merge: true });

      // Navigate to Dashboard on success
      navigation.navigate('Dashboard');
      Alert.alert(
        "Congratulations!",
        "Your account has been created successfully",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error writing document: ", error);
      Alert.alert(
        "Error",
        "Failed to save data.",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    }
};

  return (
    <View style={styles.container}>
      {/* Screen header */}
      <Text style={styles.header}>Confirm Your Details</Text>

      {/* Display user input details */}
      <Text style={styles.infoText}>Last Period Date: {formattedDate.toLocaleDateString()}</Text>
      <Text style={styles.infoText}>Period Duration: {periodDuration === 'unknown' ? 'Unknown' : `${periodDuration} days`}</Text>
      <Text style={styles.infoText}>Cycle Length: {cycleLength === 'unknown' ? 'Unknown' : `${cycleLength} days`}</Text>

      {/* Confirm button */}
      <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
        <Text style={styles.buttonText}>Confirm and Save</Text>
      </TouchableOpacity>

      {/* Go Back button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    marginVertical: 10,
  },
  confirmButton: {
    marginTop: 20,
    backgroundColor: '#BC7FCD',
    padding: 10,
    borderRadius: 5,
  },
  backButton: {
    marginTop: 10,
    backgroundColor: '#888',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  }
});

export default ConfirmationScreen;
