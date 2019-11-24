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
import route from '../api.js'
import TaskComponent from './TaskComponent.js'

export default class extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().getParam('user', null),
			visibleTalk: true,
			tasks: [],
		};

		this.logoutAction = this.logoutAction.bind(this);
	}

	logoutAction = async () => {
		await AsyncStorage.removeItem('userToken');

		this.props.navigation.navigate('Auth');
	};

	async componentDidMount() {
		this.setState({
			user: this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().getParam('user', null),
			visibleTalk: true
		});
		let b = new Date()
		let day = b.getDay()

		let response = await fetch(route('/getDailyTasks'), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				utorid: this.state.user.utorid,
				day: day
			})
		});

		let body = await response.json()
		if(response.ok){
			this.setState({
				tasks: body.dailyTasks
			})
		}
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
				<ScrollView style={{width:'100%',flex:1}} contentContainerStyle={{alignItems:'center'}}>
					<TalkingModal
						visible={!this.state.user.completedMorningTasks && this.state.visibleTalk}
						onPress={() => {
							this.setState({ visibleTalk: !this.state.visibleTalk });
							this.props.navigation.push('Camera');
						}}
						text={"Welcome aboard captain! Why not post a picture of breakfast to prepare for battle?"}
					/>

					{
						this.state.tasks ?
							this.state.tasks.map((task,index,array) => {
									return <TaskComponent schedule={array} task={task} key={index} />
								}
							)
							:
							<Text style={styles.textStyle}>No Missions Today!</Text>
					}

				</ScrollView>
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
