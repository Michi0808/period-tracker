import React, { useState, useLayoutEffect, useEffect  } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ProgressBar from 'react-native-progress/Bar';
import { useNavigation } from '@react-navigation/native';
import texts from '../constants/texts';

const LastPeriodDateScreen2 = ({ route, navigation }) => {
  const [selectedDuration, setSelectedDuration] = useState("unknown");
  const lastPeriodDate = new Date(route.params.lastPeriodDate);

  // Set navigation header options
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Step 2/3',
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#FFCDEA',
      },
      headerRight: () => (
        <ProgressBar progress={0.67} width={100} color="#FFFFFF" />
      ),
    });
  }, [navigation]);

  // Navigate to the next screen
  const onNext = () => {
    navigation.navigate('LastPeriodDate3', {
        lastPeriodDate: lastPeriodDate.toISOString(),
        periodDuration: selectedDuration
    });
  };

  return (
    <View style={styles.container}>
      {/* Question text */}
      <Text style={styles.descriptionText}>{texts.periodDurationQuestion}</Text>

      {/* Picker for selecting period duration */}
      <Picker
        selectedValue={selectedDuration}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setSelectedDuration(itemValue)}
      >
        <Picker.Item label="unknown" value="unknown" />
        <Picker.Item label="2 days" value="2" />
        <Picker.Item label="3 days" value="3" />
        <Picker.Item label="4 days" value="4" />
        <Picker.Item label="5 days" value="5" />
        <Picker.Item label="6 days" value="6" />
        <Picker.Item label="7 days" value="7" />
        <Picker.Item label="8 day" value="8" />
      </Picker>

      {/* Next button */}
      <TouchableOpacity onPress={onNext} style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next</Text>
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

export default LastPeriodDateScreen2;
