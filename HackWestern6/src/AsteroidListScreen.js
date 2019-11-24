import React from 'react';
import { SafeAreaView, Text, TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import TalkingModal from './TalkingModal.js';
import route from '../api.js';

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			modalText: '',
			user: this.props.navigation.getParam('user', null)
		};
	}

	async componentDidMount() {
		let response = await fetch(route('/user'), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				utorid: this.state.user.user.utorid,
				hashedPassword: this.state.user.user.password
			})
		});

		let responseJson = await response.json();
		await this.setState({ user: responseJson });
		console.log(this.state.user);
	}

	render() {
		const listOfCurrentAsteroids = this.state.user.user.questData.asteroidsRemaining.map((item) => {
			return (
				<View>
					<Text>{item.asteroidName}</Text>
				</View>
			);
		});
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
