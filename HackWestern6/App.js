import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
<<<<<<< HEAD
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './src/LoginScreen.js'
import HomeScreen from './src/HomeScreen.js'
import AuthLoadingScreen from './src/AuthLoadingScreen.js'
import RegisterScreen from './src/RegisterScreen.js'

const AppStack = createStackNavigator({ 
    Home: HomeScreen 
});

const AuthStack = createStackNavigator({ 
    Login: LoginScreen, 
    Register: RegisterScreen
});

const AppContainer = createAppContainer(
    createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
)
);

export default function App() {
    return (
        <AppContainer />
    );
=======

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
>>>>>>> Revert "Added a basic login screen"
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
