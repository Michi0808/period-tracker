import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import auth from '@react-native-firebase/auth';

const PasswordResetScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');

    // Handle password reset request
    const handlePasswordReset = async () => {
        if (!email) {
            Alert.alert("Error", "Please enter your email address");
            return;
        }
        try {
            await auth().sendPasswordResetEmail(email);
            Alert.alert("Success", "Please check your email to reset your password");
        } catch (error) {
            Alert.alert("Failed", error.message);
        }
    };

    return (
        <View style={styles.container}>
            {/* Screen header */}
            <Text style={styles.header}>Reset Password</Text>

            {/* Email input */}
            <Input
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                containerStyle={styles.inputContainer}
            />

            {/* Button to send password reset link */}
            <Button
                title="Send Reset Link"
                onPress={handlePasswordReset}
                buttonStyle={styles.button}
            />

            {/* Back to login link */}
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
            >
                <Text style={styles.backText}>Back to Login</Text>
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
        padding: 20,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        width: '90%',
        marginBottom: 20,
    },
    button: {
        width: '36%',
        backgroundColor: '#BC7FCD',
    },
    backButton: {
        marginTop: 20,
    },
    backText: {
        color: '#BC7FCD',
        fontSize: 16,
    },
});

export default PasswordResetScreen;
