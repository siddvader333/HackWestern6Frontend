import React from 'react';
import DatePicker from 'react-native-datepicker';
import { SafeAreaView, Text, TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import TalkingModal from './TalkingModal.js';
import route from '../api.js';

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			asteroidDate: '2019-11-01',
			asteroidName: '',
			asteroidValue: 0,
			showModal: false,
			modalText: '',
			user: this.props.navigation.getParam('user', null)
		};
	}

	addAsteroid = async () => {
		//check if valid input
		if (this.state.asteroidName !== '' && typeof Number(this.state.asteroidValue) == 'number') {
			//if valid input, make api call, show modal, set modal text to confirmation
			let response = await fetch(route('/addAsteroid'), {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					utorid: this.state.user.user.utorid,
					asteroidName: this.state.asteroidName,
					asteroidDate: this.state.asteroidDate,
					value: this.state.asteroidValue
				})
			});
			console.log(response);
			if (response.ok) {
				this.setState({
					showModal: true,
					modalText: 'Thanks! We will keep an eye out for that asteroid!'
				});
			} else {
				this.setState({
					showModal: true,
					modalText: 'Uh-oh! An error occurred!'
				});
			}
		} else {
			//if not valid input, show modal, set modal text to warning
			this.setState({
				showModal: true,
				modalText: 'Those are not valid values!'
			});
		}
	};
	render() {
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
					<TextInput
						style={styles.textStyle}
						multiline={false}
						placeholder={'Name the Asteroid!'}
						value={this.state.userText}
						onChangeText={(text) => {
							this.setState({ asteroidName: text });
						}}
					/>
					<TextInput
						style={styles.textStyle}
						multiline={false}
						placeholder={'How big is this asteroid? (1-100)'}
						value={this.state.passText}
						onChangeText={(text) => {
							this.setState({ asteroidValue: text });
						}}
					/>
					<DatePicker
						style={{ width: 200 }}
						date={this.state.date}
						mode="date"
						placeholder="select date"
						format="YYYY-MM-DD"
						minDate="2019-11-01"
						maxDate="2021-06-01"
						confirmBtnText="Confirm"
						cancelBtnText="Cancel"
						customStyles={{
							dateIcon: {
								position: 'absolute',
								left: 0,
								top: 4,
								marginLeft: 0
							},
							dateInput: {
								marginLeft: 36
							}
							// ... You can check the source to find the other keys.
						}}
						onDateChange={(date) => {
							this.setState({ asteroidDate: date });
						}}
					/>
					<TouchableOpacity
						onPress={async () => {
							await this.addAsteroid();
						}}
						style={{
							padding: 20,
							margin: 20,
							borderWidth: 2,
							margin: 15,
							borderColor: 'rgba(0,0,0,0.5)',
							borderRadius: 300
						}}
					>
						<Text>Submit</Text>
					</TouchableOpacity>
				</KeyboardAvoidingView>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	textStyle: {
		fontSize: 20,
		color: 'rgba(0,0,0,0.8)',
		padding: 5,
		margin: 20,
		width: '80%',
		borderBottomWidth: 2,
		borderBottomColor: 'rgb(0,0,0)'
	}
});
