import React from 'react'
import { 
	Text,
	TextInput,
	View,
	SafeAreaView,
	StyleSheet,
	KeyboardAvoidingView,
	TouchableOpacity,
	AsyncStorage
} from 'react-native'

export default class extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			userText: '',
			passText: '',
			error:'',
		}

		this.loginAction = this.loginAction.bind(this)
		this.errorAction = this.errorAction.bind(this)
	}

	errorAction(error){
		this.setState({
			error
		})
	}

	loginAction = async () => {
		// do something with userText and passText
		// temporary!!!!
		if(!this.state.userText)
			this.errorAction('UTorID is Empty')
		else if(!this.state.passText)
			this.errorAction('Password is Empty')
		else{

			// 	Put this next line in daniel's commit
			//	await AsyncStorage.setItem('userToken', this.state.userText, this.errorAction('Failed to save user'));
			//	this.props.navigation.navigate('App')
			//this.props.navigation.push('Registration')
		}
	}

	componentDidMount(){
		this.setState({
			userText: '',
			passText: '',
		})
	}

	render () {
		return (
			<SafeAreaView style={{width:'100%',flex:1, backgroundColor:'rgba(0,0,0,0.01'}}>
				<KeyboardAvoidingView style={{width:'100%',flex:1, justifyContent:'center', alignItems:'center', padding:20}} behaviour="padding">
					<TextInput
						style={styles.textStyle}
						multiline={false}
						placeholder={'UtorID'}
						value={this.state.userText}
						onChangeText={text => {
							this.setState({ userText: text });
						}}
					/>
					<TextInput
						style={styles.textStyle}
						multiline={false}
						placeholder={'Password'}
						secureTextEntry={true}
						value={this.state.passText}
						onChangeText={text => {
							this.setState({ passText: text });
						}}
					/>
					<View style={this.state.error ? {padding:5,margin:10,width:'80%'} : {}}>
						<Text style={{fontSize:18, color:'rgba(200,100,100,0.9)'}}>{this.state.error}</Text>
					</View>
					<TouchableOpacity onPress={this.loginAction} style={{borderWidth:2, margin:15, borderColor:'rgba(0,0,0,0.5)', borderRadius:300}}>
						<Text style={[styles.textStyle,{borderBottomWidth:0, margin:5}]}>Login or Signup</Text>
					</TouchableOpacity>
				</KeyboardAvoidingView>
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