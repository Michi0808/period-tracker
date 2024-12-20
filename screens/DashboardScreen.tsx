import React, { useState, useEffect } from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import texts from '../constants/texts';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

// Cycle phases
const FOLLICULAR_PERIOD = 6;
const OVULATION_PERIOD = 3;

const DashboardScreen = () => {
  // State variables
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState('');
  const [nextPeriodDate, setNextPeriodDate] = useState('');
  const [lastPeriodDate, setLastPeriodDate] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [diffDays, setDiffDays] = useState(0);
  const [markedDates, setMarkedDates] = useState({});
  const [cycleLength, setCycleLength] = useState(0);
  const [legendVisible, setLegendVisible] = useState(false);
  const [selectedLegend, setSelectedLegend] = useState(null);

  useEffect(() => {
    const today = new Date();
    setCurrentDate(today.toISOString().split('T')[0]);

    // Fetch user data
    const fetchUserData = async () => {
      const userId = auth().currentUser?.uid;
      if (userId) {
        try {
          const doc = await firestore().collection('users').doc(userId).get();
          if (doc.exists) {
            const data = doc.data();
              if (data.lastPeriodDate && data.cycleLength) {
                const cycleLen = parseInt(data.cycleLength);
                setDiffDays(data.diffDays);
                console.log(`Log:cycleLen: ${cycleLen}, parseInt(data.cycleLength): ${parseInt(data.cycleLength)}`);
                setCycleLength(cycleLen);

                // Calculate dates
                const lastPeriod = new Date(data.lastPeriodDate.toDate());
                const nextPeriod = calculateDate(lastPeriod, cycleLen);
                if (nextPeriod) {
                  setLastPeriodDate(lastPeriod.toISOString().split('T')[0]);
                  setNextPeriodDate(nextPeriod.toISOString().split('T')[0]);
                  updatePeriodDaysColors(lastPeriod, parseInt(data.periodDuration || 0), cycleLen);
                }
              } else {
                console.error("Missing required data fields");
              }
          }
        } catch (error) {
          console.error("Failed to retrieve data", error);
        }
      }
    };

    // Subscribe to auth state changes
    const unsubscribe = auth().onAuthStateChanged(user => {
    if (user) {
      fetchUserData();
     }
    });

    return () => unsubscribe();
  }, []);

  // Calculate next date
  const calculateDate = (baseDate, daysOffset) => {
    const resultDate = new Date(baseDate.getTime() + daysOffset * 24 * 60 * 60 * 1000);
    if (isNaN(resultDate.getTime())) {
      console.error("Invalid date calculated", resultDate);
      return null;
    }
    return resultDate;
  };

// Update calendar colors
const updatePeriodDaysColors = (startPeriod, duration, cycleLen) => {
  console.log(`Log:Updating colors with startPeriod: ${startPeriod}, duration: ${duration}, cycleLen: ${cycleLen}`);
  const formatDay = date => date.toISOString().split('T')[0];
  const lutealDuration =  cycleLen - duration - FOLLICULAR_PERIOD - OVULATION_PERIOD;
  console.log(`Log : Cycle Length: ${cycleLen}, Duration: ${duration}, Follicular Period: ${FOLLICULAR_PERIOD}, Ovulation Period: ${OVULATION_PERIOD}`);

  console.log(`Log:Luteal Duration: ${lutealDuration}`);

  let newMarkedDates = {};

  // Menstruation period
  for (let i = 0; i < duration; i++) {
    const periodDay = new Date(startPeriod);
    periodDay.setDate(startPeriod.getDate() + i);
    newMarkedDates[formatDay(periodDay)] = { selected: true, selectedColor: '#ED9B5F' };
  }

    // Follicular phase
    const follicularStart = new Date(startPeriod);
    follicularStart.setDate(startPeriod.getDate() + duration); // Start the day after menstruation ends
    const follicularEnd = new Date(follicularStart);
    follicularEnd.setDate(follicularStart.getDate() + FOLLICULAR_PERIOD); // End at the last follicular day

    for (let day = new Date(follicularStart); day <= follicularEnd; day.setDate(day.getDate() + 1)) {
      newMarkedDates[formatDay(day)] = { selected: true, selectedColor: '#DB5EA2' };
    }

  // Ovulation period
  const ovulationStart = new Date(follicularEnd);
  ovulationStart.setDate(follicularEnd.getDate() + 1);
  const ovulationEnd = new Date(ovulationStart);
  ovulationEnd.setDate(ovulationStart.getDate() + OVULATION_PERIOD);
  for (let k = ovulationStart; k < ovulationEnd; k.setDate(k.getDate() + 1)) {
    newMarkedDates[formatDay(k)] = { selected: true, selectedColor: '#9E82CD' };
  }

  // Luteal phase
  const lutealStart = new Date(ovulationEnd);
  lutealStart.setDate(ovulationEnd.getDate());
  const lutealEnd = new Date(lutealStart);
  lutealEnd.setDate(lutealStart.getDate() + lutealDuration);
  console.log(`Log: Luteal Start: ${lutealStart}, Luteal End: ${lutealEnd}`);
  for (let l = lutealStart; l < lutealEnd; l.setDate(l.getDate() + 1)) {
    newMarkedDates[formatDay(l)] = { selected: true, selectedColor: '#77B0AA' };
  }

  setMarkedDates(newMarkedDates);
};

  // Handle day selection
  const onDayPress = (day) => {
    if (selectedDate !== day.dateString) {
      setSelectedDate(day.dateString);
    }
  };

  // Generate calendar marks
  const getMarkedDates = () => {
    return {
      ...markedDates,
      [nextPeriodDate]: { selected: true, selectedColor: '#FA7070' },
      [lastPeriodDate]: { selected: true, selectedColor: '#2B2B2B' },
      ...(selectedDate ? { [selectedDate]: { selected: true, selectedColor: '#D3D3D3'} } : {})
    };
  };

  // Record period action
  const handleRecordPeriod = () => {
    if (!selectedDate) {
      Alert.alert('No date selected', 'Please select a date to record as a period date.');
      return;
    }

    Alert.alert(
      'Record Period',
      `Would you like to record ${selectedDate} as the period date?`,
      [
        {
          text: 'Yes',
          onPress: () => {
            updatePeriodData();
          },
        },
        {
          text: 'No',
          onPress: () => console.log('No action taken'),
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

const updatePeriodData = async () => {
  const userId = auth().currentUser?.uid;
  if (!userId) {
    alert("User not found");
    return;
  }

  const newPeriodDate = new Date(selectedDate);
  const oldNextPeriodDate = new Date(nextPeriodDate);

  const doc = await firestore().collection('users').doc(userId).get();
  if (doc.exists) {
    const userData = doc.data();
    const cycleLen = parseInt(userData.cycleLength);
    const newNextPeriodDate = calculateDate(newPeriodDate, cycleLen);

    if (newNextPeriodDate) {
      const formattedNewPeriodDate = new Date(newPeriodDate.toISOString().split('T')[0]);
      const formattedLastExpecetedPeriodDate = new Date(nextPeriodDate + 'T00:00:00Z');

      const daysDiff = (formattedNewPeriodDate - formattedLastExpecetedPeriodDate) / (1000 * 60 * 60 * 24);

      console.log(`Log diff : formattedNewPeriodDate: ${formattedNewPeriodDate}, formattedLastExpecetedPeriodDate: ${formattedLastExpecetedPeriodDate}, daysDiff: ${daysDiff}`);
      setDiffDays(Math.round(daysDiff));
      setLastPeriodDate(newPeriodDate.toISOString().split('T')[0]);
      setNextPeriodDate(newNextPeriodDate.toISOString().split('T')[0]);
      setCycleLength(cycleLen);

      console.log(`Log : oldNextPeriodDate: ${oldNextPeriodDate}`);

      await firestore().collection('users').doc(userId).set({
        lastPeriodDate: firestore.Timestamp.fromDate(newPeriodDate),
        oldNextPeriodDate: firestore.Timestamp.fromDate(oldNextPeriodDate),
        cycleLength: cycleLen,
        diffDays: Math.round(daysDiff)
      }, { merge: true });

      updatePeriodDaysColors(newPeriodDate, parseInt(userData.periodDuration || 0), cycleLen);

      Alert.alert(
        "Success!",
        `Your period has been recorded. The next expected period is on ${newNextPeriodDate.toISOString().split('T')[0]}.`,
        [{ text: "OK" }]
      );
    }
  }
};

  return (
    <View style={styles.container}>
      {/* Settings button */}
      <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Setting')}>
        <Icon name="settings" size={30} color="#808080" />
      </TouchableOpacity>

      {/* Display current date */}
      <Text style={styles.dateText}>{currentDate}</Text>

      {/* Calendar component */}
      <Calendar
        current={currentDate}
        markedDates={getMarkedDates()}
        onDayPress={onDayPress}
        theme={{
          selectedDayBackgroundColor: '#FFCDEA',
          todayTextColor: '#FFCDEA',
          arrowColor: 'pink',
        }}
        style={styles.calendar}
      />

      {/* Record period button */}
      <TouchableOpacity onPress={handleRecordPeriod} style={styles.recordButton}>
        <Text style={styles.recordButtonText}>Record Period</Text>
      </TouchableOpacity>

      {/* Legends button */}
      <TouchableOpacity onPress={() => setLegendVisible(true)} style={styles.legendButton}>
        <Text style={styles.legendButtonText}>Legends</Text>
      </TouchableOpacity>

      {/* Message box for cycle info */}
      <View style={styles.messageBox}>
        <Text style={styles.messageText}>{texts.lastPeriodRecorded(diffDays)}</Text>
      </View>

      {/* Next period info */}
      <Text style={styles.nextPeriodText}>Next Period Date: {nextPeriodDate}</Text>

      {/* Legend modal */}
      {legendVisible && (
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Legends</Text>
            {Object.values(texts.legend).map((item, index) => (
              <Text
                key={index}
                style={styles.legendItem}
                onPress={() => setSelectedLegend(item)}
              >
                <Text style={{ color: item.color }}>●</Text> {item.title}
              </Text>
            ))}
            <TouchableOpacity onPress={() => setLegendVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

        {/* Selected Legend modal */}
        {selectedLegend && (
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeader}>{selectedLegend.title}</Text>
              <Text style={styles.modalDescription}>{selectedLegend.description}</Text>
              <TouchableOpacity
                onPress={() => setSelectedLegend(null)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFCDEA',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingTop: 10,
    paddingLeft: 10
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    margin: 10
  },
  settingsButton: {
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 10
  },
  nextPeriodText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    marginVertical: 10
  },
  calendar: {
    width: '97%',
  },
  recordButton: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#BC7FCD',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  recordButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  legendButton: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    padding: 10,
    backgroundColor: '#BC7FCD',
    borderRadius: 10,
  },
  legendButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  legendItem: {
    fontSize: 16,
    marginVertical: 5,
  },
  modalDescription: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#BC7FCD',
    borderRadius: 10,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  messageBox: {
    borderWidth: 1,
    borderColor: '#666',
    padding: 3
  },
  messageText: {
    fontSize: 16
  }
});

export default DashboardScreen;
