import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';

const App = () => {
  return (
    <View style={styles.container}>
      <Text h1>Welcome</Text>
      <Button title="Click Me" onPress={() => console.log("Button Pressed!")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
