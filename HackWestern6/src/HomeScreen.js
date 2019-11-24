import React from 'react';
import {
	Text,
	TextInput,
	View,
	SafeAreaView,
	StyleSheet,
	ScrollView,
	ActivityIndicator,
	KeyboardAvoidingView,
	RefreshControl,
	TouchableOpacity,
	AsyncStorage
} from 'react-native';
import TalkingModal from './TalkingModal.js';

export default class extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().getParam('user', null),
			visibleTalk: true
		};

		this.logoutAction = this.logoutAction.bind(this);
	}

	logoutAction = async () => {
		await AsyncStorage.removeItem('userToken');

		this.props.navigation.navigate('Auth');
	};

	componentDidMount() {
		this.setState({
			user: this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().getParam('user', null),
			visibleTalk: true
		});
	}

	componentDidUpdate(prevProps) {
		if(prevProps.navigation.dangerouslyGetParent().getParam('user',null) != this.props.navigation.dangerouslyGetParent().getParam('user',null))
			this.setState({ user: this.props.navigation.dangerouslyGetParent().getParam('user',null) })
	}

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
				<Text style={styles.textStyle}>What it do babyyy</Text>
				<TalkingModal
					visible={!this.state.user.completedMorningTasks && this.state.visibleTalk}
					onPress={() => {
						this.setState({ visibleTalk: !this.state.visibleTalk });
						this.props.navigation.push('Camera');
					}}
					text={"Welcome aboard captain! Why not post a picture of breakfast to prepare for battle?"}
				/>
				<TouchableOpacity
					onPress={this.logoutAction}
					style={{
						padding: 20,
						margin: 20,
						borderWidth: 2,
						margin: 15,
						borderColor: 'rgba(0,0,0,0.5)',
						borderRadius: 300
					}}
				>
					<Text>Logout</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						padding: 20,
						margin: 20,
						borderWidth: 2,
						margin: 15,
						borderColor: 'rgba(0,0,0,0.5)',
						borderRadius: 300
					}}
					onPress={() => {
						this.props.navigation.push('AsteroidDetection', { user: this.state.user });
					}}
				>
					<Text>sup</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						padding: 20,
						margin: 20,
						borderWidth: 2,
						margin: 15,
						borderColor: 'rgba(0,0,0,0.5)',
						borderRadius: 300
					}}
					onPress={() => {
						this.props.navigation.push('AsteroidList', { user: this.state.user });
					}}
				>
					<Text>sup2</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => {
						this.props.navigation.push('Store', { user: this.state.user });
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
					<Text>Go to Store</Text>
				</TouchableOpacity>
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
