import React, { useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity }   from 'react-native';
import { Text, Input, Icon, Button } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter email and password");
            return;
        }
        try {
            const userCredential = await auth().signInWithEmailAndPassword(email, password);
            // ログイン成功後、Firestoreからユーザーデータを取得
            const userData = await firestore().collection('users').doc(userCredential.user.uid).get();
            if (userData.exists) {
                // データを元にダッシュボードに遷移
                navigation.navigate('Dashboard', { userData: userData.data() });
            } else {
                Alert.alert("Error", "No user data found.");
            }
        } catch (error) {
            Alert.alert("Login Failed", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Login</Text>
            </View>
            <Input
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
            />
            <Input
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible}
                rightIcon={
                    <Icon
                        name={passwordVisible ? 'visibility' : 'visibility-off'}
                        type="material"
                        onPress={() => setPasswordVisible(!passwordVisible)}
                    />
                }
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
            />
            <Button
                title="Login"
                onPress={handleLogin}
                buttonStyle={[styles.button, { backgroundColor: '#BC7FCD' }]}
                containerStyle={styles.buttonContainer}
            />
            <Button
                title="Sign Up"
                type="outline"
                buttonStyle={[styles.button, styles.signUpButton]}
                titleStyle={styles.signUpTitle}
                containerStyle={styles.buttonContainer}
                onPress={() => navigation.navigate('SignUp')}
            />
            <TouchableOpacity
                onPress={() => navigation.navigate('PasswordReset')}
                style={styles.linkContainer}
            >
                <Text style={styles.linkText}>Forgot Password?</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFCDEA',
    },
    header: {
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 50,
        fontWeight: 'bold',
    },
    inputContainer: {
        marginTop: 30,
        width: '80%',
    },
    input: {
        fontSize: 18,
    },
    buttonContainer: {
        width: '80%',
        marginVertical: 10,
    },
    button: {
        height: 50,
    },
    signUpButton: {
        borderColor: 'grey',
        borderWidth: 1,
    },
    signUpTitle: {
        color: 'grey',
    },
});

export default HomeScreen;
