import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Input, Button, Icon } from 'react-native-elements';
import texts from '../constants/texts';
import auth from '@react-native-firebase/auth';

const SignUpScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    // Handle sign-up process
    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            alert(texts.passwordUnmatched);
            return;
        }
        // debug mode
        //navigation.navigate('LastPeriodDate1');
        try {
            await auth().createUserWithEmailAndPassword(email, password);
            navigation.navigate('LastPeriodDate1');
        } catch (error) {
            alert(error.message);
        }
    };

    // Navigate to Home screen
    const handleGoHome = () => {
        navigation.navigate('Home');  // Navigate to Home screen
    };

    return (
        <ScrollView style={styles.container}>
            {/* Screen title */}
            <Text h3 style={styles.title}>Create Account</Text>

            {/* Email input field */}
            <Input
                placeholder="Email Address"
                leftIcon={<Icon name="email" size={24} color="black" />}
                value={email}
                onChangeText={setEmail}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
            />

            {/* Password input field */}
            <Input
                placeholder="Password"
                secureTextEntry={!passwordVisible}
                leftIcon={<Icon name="lock" size={24} color="black" />}
                rightIcon={
                    <Icon
                        name={passwordVisible ? 'visibility' : 'visibility-off'}
                        size={24}
                        color="grey"
                        onPress={() => setPasswordVisible(!passwordVisible)}
                    />
                }
                value={password}
                onChangeText={setPassword}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
            />

            {/* Confirm password input field */}
            <Input
                placeholder="Confirm Password"
                secureTextEntry={!confirmPasswordVisible}
                leftIcon={<Icon name="lock" size={24} color="black" />}
                rightIcon={
                    <Icon
                        name={confirmPasswordVisible ? 'visibility' : 'visibility-off'}
                        size={24}
                        color="grey"
                        onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                    />
                }
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
            />

            {/* Sign up button */}
            <Button
                title="Sign Up"
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.button}
                onPress={handleSignUp}
            />

            {/* Go to Home button */}
            <Button
                title="Go to Home"
                type="clear"
                titleStyle={{ color: '#BC7FCD' }}
                onPress={handleGoHome}
                containerStyle={styles.buttonContainer}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFCDEA',
        padding: 10,
    },
    title: {
        marginVertical: 20,
        textAlign: 'center',
    },
    inputContainer: {
        marginVertical: 10,
        width: '100%',
    },
    input: {
        marginLeft: 10,
    },
    buttonContainer: {
        marginVertical: 20,
        width: '95%',
        alignSelf: 'center',
    },
    button: {
        backgroundColor: '#BC7FCD',
        height: 50,
    },
});

export default SignUpScreen;
