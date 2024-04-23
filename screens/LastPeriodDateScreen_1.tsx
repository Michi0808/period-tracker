import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import texts from '../constants/texts';

const LastPeriodDateScreen1 = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Step 1/3',
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#FFCDEA',
      },
      headerRight: () => (
        <ProgressBar progress={0.33} width={100} color="#FFFFFF" />
      ),
    });
  }, [navigation]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

const goToNextScreen = () => {
  const formattedDate = date.toISOString();
  navigation.navigate('LastPeriodDate2', { lastPeriodDate: formattedDate });
};

  return (
    <View style={styles.container}>
      <Text style={styles.descriptionText}>{texts.lastPeriodQuestion}</Text>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>Last Period Date: {date.toLocaleDateString()}</Text>
        <TouchableOpacity onPress={showDatepicker} style={styles.iconButton}>
          <Icon name="calendar-today" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <TouchableOpacity onPress={goToNextScreen} style={styles.nextButton}>
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
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconButton: {
    marginLeft: 10,
  },
  descriptionText: {
    fontSize: 18,
    padding: 20,
    textAlign: 'center',
    marginBottom: 20
  },
  dateText: {
    fontSize: 20,
    color: '#333'
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
  }
});

export default LastPeriodDateScreen1;
