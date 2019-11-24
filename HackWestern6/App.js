import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import LoginScreen from './src/LoginScreen.js';
import HomeScreen from './src/HomeScreen.js';
import AuthLoadingScreen from './src/AuthLoadingScreen.js';
import RegisterScreen from './src/RegisterScreen.js';
import StoreScreen from './src/StoreScreen.js';
import AsteroidDetectionScreen from './src/AsteroidDetectionScreen.js';
import CameraScreen from './src/CameraFeed.js';

const AppTab = createBottomTabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: 'Home',
            headerShown:false,
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('./assets/startup.png')}
                    style={{ height: 30, width: 30, tintColor: tintColor }}
                />
            )
        })
    },
    Store: {
        screen: StoreScreen,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: 'Store',
            headerShown:false,
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('./assets/space-comet.png')}
                    style={{ height: 30, width: 30, tintColor: tintColor }}
                />
            )
        })
    },
    AsteroidDetection: {
        screen: AsteroidDetectionScreen,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: 'Scanner',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('./assets/telescope.png')}
                    style={{ height: 30, width: 30, tintColor: tintColor }}
                />
            ),
        })
    },
},{
    initialRouteName:'Home',
    tabBarOptions:{
        activeTintColor: 'rgb(255,255,255)',
        style: {
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'rgb(137, 82, 156)',
            shadowColor: 'rgba(0,0,0,0.5)',
            shadowOffset: {
              width: 0,
              height: 0
            },
            shadowOpacity: 0.5,
            shadowRadius:20,
            borderTopWidth:0,

            elevation: 20,
        }
    }
});

const AppStack = createStackNavigator({
    Camera: {
        screen: CameraScreen
    },
    Home: {
        screen: AppTab,
        headerShown:false,
    },
},{
    headerMode:'none',
    initialRouteName:'Home',
})

const AuthStack = createStackNavigator({ 
    Login: LoginScreen, 
    Register: RegisterScreen
});

const AppContainer = createAppContainer(
	createSwitchNavigator(
		{
			AuthLoading: AuthLoadingScreen,
			App: AppStack,
			Auth: AuthStack
		},
		{
			initialRouteName: 'AuthLoading'
		}
	)
);

export default function App() {
	return <AppContainer />;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
