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
	TouchableOpacity
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
	}

	loginAction(){
		// do something with userText and passText
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