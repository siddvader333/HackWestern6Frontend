import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './src/LoginScreen.js'
import HomeScreen from './src/HomeScreen.js'
import AuthLoadingScreen from './src/AuthLoadingScreen.js'
import RegisterScreen from './src/RegisterScreen.js'
import StoreScreen from './src/StoreScreen.js'
import CameraScreen from './src/CameraFeed.js'

const AppStack = createStackNavigator({ 
    Home: HomeScreen,
    Store: StoreScreen,
    Camera: CameraScreen,

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
        initialRouteName: 'App',
    }
)
);

export default function App() {
    return (
        <AppContainer />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
