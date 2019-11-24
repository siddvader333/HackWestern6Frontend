import React from 'react';
import {
	Text,
	TextInput,
	View,
	SafeAreaView,
	StyleSheet,
	KeyboardAvoidingView,
	TouchableOpacity,
	AsyncStorage,
	Modal,
	Platform,
	ActivityIndicator
} from 'react-native';
import route from '../api.js';

export default class extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			userText: '',
			passText: '',
			error: '',
			waiting: null
		};

		this.loginAction = this.loginAction.bind(this);
		this.errorAction = this.errorAction.bind(this);
	}

	errorAction(error) {
		this.setState({
			error
		});
	}

	loginAction = async () => {
		// do something with userText and passText
		// temporary!!!!
		if (!this.state.userText) this.errorAction('UTorID is Empty');
		else if (!this.state.passText) this.errorAction('Password is Empty');
		else {
			// best to do this as a promise so i can invoke loading activity indicator
			let response = await fetch(route('/login'), {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					utorid: this.state.userText,
					password: this.state.passText
				})
			});

			if (response.ok) {
				let body = await response.json();
				console.log(body);
				if (body.message) {
					//this.props.navigation.push('Registration')
					this.props.navigation.push('Register');

					this.setState({
						waiting: false
					});
				} else {
					await AsyncStorage.setItem('userToken', JSON.stringify(body));
					this.props.navigation.navigate('App', { user: body, name: body.preferredName });
				}
			} else {
				let body = await response.json();
				console.log(body);
				if (body) this.errorAction(body.error);
				else this.errorAction('Failed to fetch user info');

				this.setState({
					waiting: false
				});
			}
		}
	};

	componentDidMount() {
		this.setState({
			userText: '',
			passText: '',
			error: '',
			waiting: false
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if (!prevState.waiting && this.state.waiting) {
			this.loginAction();
		}
	}

	render() {
		return (
			<SafeAreaView style={{ width: '100%', flex: 1, backgroundColor: 'rgba(0,0,0,0.01' }}>
				<KeyboardAvoidingView
					style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}
					behaviour="padding"
				>
					<TextInput
						style={styles.textStyle}
						multiline={false}
						placeholder={'UtorID'}
						value={this.state.userText}
						onChangeText={(text) => {
							this.setState({ userText: text });
						}}
					/>
					<TextInput
						style={styles.textStyle}
						multiline={false}
						placeholder={'Password'}
						secureTextEntry={true}
						value={this.state.passText}
						onChangeText={(text) => {
							this.setState({ passText: text });
						}}
					/>
					<View style={this.state.error ? { padding: 5, margin: 10, width: '80%' } : {}}>
						<Text style={{ fontSize: 18, color: 'rgba(200,100,100,0.9)' }}>{this.state.error}</Text>
					</View>
					<TouchableOpacity
						onPress={() => {
							this.setState({ waiting: true });
						}}
						style={{ borderWidth: 2, margin: 15, borderColor: 'rgba(0,0,0,0.5)', borderRadius: 300 }}
					>
						<Text style={[ styles.textStyle, { borderBottomWidth: 0, margin: 5 } ]}>Login or Signup</Text>
					</TouchableOpacity>
					<Modal
						visible={this.state.waiting}
						animationType={'none'}
						onRequestClose={() => {
							this.setState({ waiting: false });
						}}
						transparent={true}
					>
						<View
							style={{
								flex: 1,
								width: '100%',
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: 'rgba(0,0,0,0.5)'
							}}
						>
							<ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 40} color={'rgb(100,100,200)'} />
						</View>
					</Modal>
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
