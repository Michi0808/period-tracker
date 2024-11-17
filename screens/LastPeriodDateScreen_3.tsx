import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ProgressBar from 'react-native-progress/Bar';
import { useNavigation, useRoute } from '@react-navigation/native';
import texts from '../constants/texts';

const LastPeriodDateScreen3 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedCycle, setSelectedCycle] = useState("unknown");
  const lastPeriodDate = new Date(route.params.lastPeriodDate);
  const periodDuration = route.params.periodDuration;

  useLayoutEffect(() => {
    // Set header options
    navigation.setOptions({
      headerTitle: 'Step 3/3',
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#FFCDEA',
      },
      headerRight: () => (
        <ProgressBar progress={1.0} width={100} color="#FFFFFF" />
      ),
    });
  }, [navigation]);

  // Navigate to the confirmation screen
  const onNext = () => {
    navigation.navigate('ConfirmationScreen', {
      lastPeriodDate: lastPeriodDate.toISOString(),
      periodDuration,
      cycleLength: selectedCycle
    });
  };
  return (
    <View style={styles.container}>
      {/* Display the question */}
      <Text style={styles.descriptionText}>{texts.periodCycleQuestion}</Text>

      {/* Picker for cycle length */}
      <Picker
        selectedValue={selectedCycle}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedCycle(itemValue)}
      >
        <Picker.Item label="Unknown" value="unknown" />
        <Picker.Item label="25 days" value="25" />
        <Picker.Item label="26 days" value="26" />
        <Picker.Item label="27 days" value="27" />
        <Picker.Item label="28 days" value="28" />
        <Picker.Item label="29 days" value="29" />
        <Picker.Item label="30 days" value="30" />
        <Picker.Item label="31 days" value="31" />
      </Picker>

      {/* Done button */}
      <TouchableOpacity onPress={onNext} style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Done</Text>
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
  },
  descriptionText: {
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  nextButton: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BC7FCD'
  },
  nextButtonText: {
    color: 'white',
    fontSize: 20
  },
  picker: {
    width: 150,
    height: 50,
  }
});

export default LastPeriodDateScreen3;
