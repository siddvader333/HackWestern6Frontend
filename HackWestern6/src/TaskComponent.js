import React from 'react'
import { 
	Text,
	TextInput,
	View,
	Image,
	SafeAreaView,
	StyleSheet,
	ScrollView,
	ActivityIndicator,
	KeyboardAvoidingView,
	RefreshControl,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Modal,
	AsyncStorage,
} from 'react-native'
import route from '../api.js'
import TalkingModal from './TalkingModal.js'

const galbraithLocation = {latitude:43.659851,longitude:-79.396281}

export default class extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			talkText: ''
		}

		this.geoHelper = this.geoHelper.bind(this)
		//navigator.geolocation.requestAuthorization()
	}

	geoHelper(){
		let b = new Date()
		if(b.getHours() % 12 + 1 == (this.props.task.time.charAt(1) === ':' ? Number(this.props.task.time.charAt(0)) : Number(this.props.task.time.charAt(1)+10))){
			navigator.geolocation.getCurrentPosition(async (position) => {
				if(fabs(position.coords.latitude - galbraithLocation.latitude) < 0.0002 
					&& fabs(positiion.coords.longitude - galbraithLocation.longitude) < 0.0002){
					this.props.schedule[this.props.index].status = 'Complete';
					let response = await fetch(route('/updateTaskStatus'), {
						method: 'POST',
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							utorid: this.state.userText,
							day: b.getDay(),
							updatedTasks: this.props.schedule
						})
					});

					let body = await response.json()
					if(response.ok){
						let response = await fetch(route('/addGold'), {
							method: 'POST',
							headers: {
								Accept: 'application/json',
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								utorid: this.state.user.utorid,
								goldToAdd: 10
							})
						});

						this.setState({
							talkText: 'You earned ten (10) gold by going to ' + this.props.task.courseCode + ' ' + this.props.task.section
						})
					}
				}
			})
		}
	}

	render () {
		let b = new Date()
		let color = 'white';
		if(hours % 12 + 1 == (this.props.task.time.charAt(1) === ':' ? Number(this.props.task.time.charAt(0)) : Number(this.props.task.time.charAt(1)+10))){
			color = 'rgb(150,150,230)';
		}else if(hours % 12 + 1 > (this.props.task.time.charAt(1) === ':' ? Number(this.props.task.time.charAt(0)) : Number(this.props.task.time.charAt(1)+10))){
			color = 'rgb(230,100,100)';
		}else{
			color = 'rgb(155,155,155)';
		}

		return (
			<TouchableOpacity style={{backgroundColor:color, borderRadius:50,margin:10}} onPress={this.geoHelper}>
				<View style={{backgroundColor:color, borderRadius:50, alignItems:'center', justifyContent:'center'}}>
					<View style={{width:'100%', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
						<Text style={styles.textStyle}>{this.props.task.courseCode}</Text>
						<Text style={styles.textStyle}>{this.props.task.section}</Text>
					</View>
					<Text style={styles.textStyle}>{this.props.task.location}</Text>
					<Text style={styles.textStyle}>{this.props.task.time}</Text>
				</View>
				<TalkingModal
                  visible={this.state.talkText ? true : false}
                  onPress={() => {
                    this.setState({ talkText: '' });
                  }}
                  text={this.state.talkText}
                />
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	textStyle: {
		fontSize:15,
		color:'rgba(0,0,0,0.8)',
		padding:5,
		margin: 10,
	}
})