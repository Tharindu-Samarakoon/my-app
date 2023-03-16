import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const fireAuth = auth;
    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(fireAuth, (user) => {
            if(user) {
                navigation.replace('Home');
            }
        })
        return unsubscribe
    }, [])

    const handlueSignUp = () => {
        createUserWithEmailAndPassword(fireAuth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log(user);
        })
        .catch(error => {
            alert(error.message);
        })
    }

    const handleLogin = () => {
        signInWithEmailAndPassword(fireAuth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Logged in with : ' + user.email);
        })
        .catch(error => {
            alert(error.message);
        })
    }

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior="height">

        <View style={styles.inputContainer}>
            <TextInput
                placeholder='Email'
                value={email}
                onChangeText={text => {setEmail(text)}}
                style={styles.input} />
            <TextInput
                placeholder='Password'
                value={password}
                secureTextEntry
                onChangeText={text => {setPassword(text)}}
                style={styles.input} />
        </View>

        <View
            style={styles.buttonContainer}>

            <TouchableOpacity
            onPress={handleLogin}
            style={styles.button}>
                <Text style={styles.buttonText}>
                    Login
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={handlueSignUp}
            style={[styles.button, styles.buttonOutline]}>
                <Text style={styles.buttonOutlineText}>
                    Register
                </Text>
            </TouchableOpacity>
            

        </View>

    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    inputContainer : {
        width: '80%'
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    input : {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
    },
    button: {
        backgroundColor: '#1a5096',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonOutline : {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#1a5096',
        borderWidth: 2

    },
    buttonOutlineText : {
        color: '#1a5096',
        fontWeight: '700',
        fontSize: 16
    },
    buttonText : {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    }
})