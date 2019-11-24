import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
	View,
} from 'react-native';
import route from '../api.js'

export default class extends React.Component {
	constructor(props){
		super(props)
	}

    componentDidMount() {
        this._bootstrapAsync()
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        if(userToken){
            let temp = JSON.parse(userToken)

            let response = await fetch(route('/user'), {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    utorid: temp.utorid,
                    hashedPassword: temp.password
                })
            });

            if(response.ok){
                let body = await response.json()
                this.props.navigation.navigate('App', { user: body, name: body.preferredName })
            }else{
                this.props.navigation.navigate('App', { user: temp, name: temp.preferredName })
            }
        }else{
            this.props.navigation.navigate('Auth');
        }
    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={{alignItems:'center', justifyContent:'center'}}>
                <ActivityIndicator size="large"/>
                <StatusBar barStyle="default" />
            </View>
        );
    }
}