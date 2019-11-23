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

export default class extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			user: null
		}

		this.logoutAction = this.logoutAction.bind(this)
	}

	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.state.params ? navigation.state.params.user.utorid : 'Welcome On Board!'
		}
	}

	logoutAction = async () => {
		await AsyncStorage.removeItem('userToken');

		this.props.navigation.navigate('Auth')
	}

	componentDidMount(){
		this.setState({
			user: this.props.navigation.state.params ? this.props.navigation.state.params.user : null
		})
	}

	render () {
		return (
			<SafeAreaView style={{backgroundColor:'rgba(0,0,0,0.01)',width:'100%',flex:1, justifyContent:'center', alignItems:'center', padding:20}}>
				<Text style={styles.textStyle}>
					What it do babyyy
				</Text>
				<TouchableOpacity onPress={this.logoutAction} style={{padding:20, margin: 20, borderWidth:2, margin:15, borderColor:'rgba(0,0,0,0.5)', borderRadius:300}}>
					<Text>
						Logout
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