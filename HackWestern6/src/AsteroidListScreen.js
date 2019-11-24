import React from 'react';
import { SafeAreaView, Text, View, TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import TalkingModal from './TalkingModal.js';
import route from '../api.js';

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			modalText: '',
			user: this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().getParam('user',null)
		};
	}

	async componentDidMount() {
		// console.log(this.props.navigation.dangerouslyGetParent().dangerouslyGetParent())
		let temp_user = this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().getParam('user',null)
		let response = await fetch(route('/user'), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				utorid: temp_user.utorid,
				hashedPassword: temp_user.password
			})
		});

		let responseJson = await response.json();
		this.setState({ user: responseJson });
	}

	render() {
		const listOfCurrentAsteroids = this.state.user ? this.state.user.questData.asteroidsRemaining.map((item, index) => {
			return (
				<View key={index}>
					<Text>{item.asteroidName}</Text>
				</View>
			);
		}) : null;
		return (
			<SafeAreaView
				style={{
					backgroundColor: 'rgba(0,0,0,0.01)',
					width: '100%',
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					padding: 20
				}}
			>
				<KeyboardAvoidingView
					style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}
					behaviour="padding"
				>
					<TalkingModal
						visible={this.state.showModal}
						onPress={() => {
							this.setState({ showModal: !this.state.showModal });
						}}
						text={this.state.modalText}
					/>
					{listOfCurrentAsteroids}
				</KeyboardAvoidingView>
			</SafeAreaView>
		);
	}
}
