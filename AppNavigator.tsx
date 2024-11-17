import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import LastPeriodDateScreen1 from './screens/LastPeriodDateScreen_1';
import LastPeriodDateScreen2 from './screens/LastPeriodDateScreen_2';
import LastPeriodDateScreen3 from './screens/LastPeriodDateScreen_3';
import ConfirmationScreen from './screens/ConfirmationScreen';
import DashboardScreen from './screens/DashboardScreen';
import SettingScreen from './screens/SettingScreen';
import PasswordResetScreen from './screens/PasswordResetScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#BC7FCD',
        },
        headerTitleAlign: 'center',
        headerTitleContainerStyle: {
          left: 0,
          right: 0,
        },
      }}
    >

      {/* Home screen */}
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />

      {/* Sign-up screen */}
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />

      {/* Last period date step 1 */}
      <Stack.Screen
        name="LastPeriodDate1"
        component={LastPeriodDateScreen1}
        options={{
          headerTitle: 'Step 1 of 3',
          headerBackTitleVisible: false
        }}
      />

      {/* Last period date step 2 */}
      <Stack.Screen
        name="LastPeriodDate2"
        component={LastPeriodDateScreen2}
        options={{
          headerTitle: 'Step 2 of 3',
          headerBackTitleVisible: false
        }}
      />

      {/* Last period date step 3 */}
      <Stack.Screen
        name="LastPeriodDate3"
        component={LastPeriodDateScreen3}
        options={{
          headerTitle: 'Step 3 of 3',
          headerBackTitleVisible: false
        }}
      />

      {/* Confirmation screen */}
      <Stack.Screen name="ConfirmationScreen" component={ConfirmationScreen} options={{ headerShown: false }} />

      {/* Dashboard screen */}
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />

      {/* Settings screen */}
      <Stack.Screen name="Setting" component={SettingScreen} options={{ headerShown: false }} />

      {/* Password reset screen */}
      <Stack.Screen name="PasswordReset" component={PasswordResetScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
