import React from 'react'
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
	AsyncStorage,
} from 'react-native'
import TalkingModal from './TalkingModal.js'

export default class extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			user: this.props.navigation.dangerouslyGetParent().getParam('user',null),
			visibleTalk:true,
		}

		this.logoutAction = this.logoutAction.bind(this)
	}

	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.dangerouslyGetParent().getParam('name','Welcome on Board!')
		}
	}

	logoutAction = async () => {
		await AsyncStorage.removeItem('userToken');

		this.props.navigation.navigate('Auth')
	}

	componentDidMount(){
		this.props.navigation.setParams({
			name: this.props.navigation.dangerouslyGetParent().getParam('name',null)
		})
		this.setState({
			user: this.props.navigation.dangerouslyGetParent().getParam('user',null),
			visibleTalk:true,
		})
	}

	componentDidUpdate(prevProps){

	}

	render () {
		return (
			<SafeAreaView style={{backgroundColor:'rgba(0,0,0,0.01)',width:'100%',flex:1, justifyContent:'center', alignItems:'center', padding:20}}>
				<Text style={styles.textStyle}>
					What it do babyyy
				</Text>
				<TalkingModal 
					visible={this.state.visibleTalk} 
					onPress={()=>{
							this.setState({visibleTalk:!this.state.visibleTalk})

						}
					} 
					text={'Welcome aboard captain! Ready to start today\'s mission?'}
				/>
				<TouchableOpacity onPress={this.logoutAction} style={{padding:20, margin: 20, borderWidth:2, margin:15, borderColor:'rgba(0,0,0,0.5)', borderRadius:300}}>
					<Text>
						Logout
					</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => {
					this.props.navigation.push('Store', { user: this.state.user })
				}} style={{padding:20, margin: 20, borderWidth:2, margin:15, borderColor:'rgba(0,0,0,0.5)', borderRadius:300}}>
					<Text>
						Go to Store
					</Text>
				</TouchableOpacity>
			</SafeAreaView>
			)
	}
}

const styles = StyleSheet.create({
	textStyle: {
		fontSize:20,
		color:'rgba(0,0,0,0.8)',
		padding:5,
		margin: 20,
		width:'80%',
		borderBottomWidth:2,
		borderBottomColor:'rgb(0,0,0)',
	}
})