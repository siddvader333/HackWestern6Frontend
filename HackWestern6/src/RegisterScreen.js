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
	Modal, 
	TouchableOpacity, 
	AsyncStorage,
	Platform
} from 'react-native'
import route from '../api.js'

export default class extends React.Component {

	
	constructor(props){
		super(props)

		this.state = {
			userText: '', 
			currentQuestion: 1, 
			name: '', 
			utorid: '',
			password: '',
			age: '', 
			phone: '',
			discipline: '',  
			error: '',
			waiting: null,  
		}

		this.nextQuestion = this.nextQuestion.bind(this); 
		this.registerAction = this.registerAction.bind(this); 
		this.errorAction = this.errorAction.bind(this);
	}

	componentDidMount(){
		this.setState({
			userText: '',
			currentQuestion: 1,
			name: '',
			utorid: '',
			password: '',
			age: '',
			phone: '',
			discipline: '',
			waiting: false, 
		})
	}

	componentDidUpdate(prevProps, prevState){
		if (!prevState.waiting && this.state.waiting){
			this.registerAction()
		}
	}

	nextQuestion(){
		if (this.state.currentQuestion == 1){
			//save name, ask for utorid
			const setValue = this.state.userText; 
			this.setState({
				name: setValue,
				userText: '',
				currentQuestion: 2,
			})
		}
		else if (this.state.currentQuestion == 2){
			//save utorid, ask for password
			const setValue = this.state.userText; 
			this.setState({
				utorid: setValue,
				userText: '',
				currentQuestion: 3,
			})
		}
		else if (this.state.currentQuestion == 3){
			//save password, ask for age
			const setValue = this.state.userText; 
			this.setState({
				password: setValue,
				userText: '',
				currentQuestion: 4,
			})
		}
		else if (this.state.currentQuestion == 4){
			//save age, ask for phone
			const setValue = this.state.userText; 
			this.setState({
				age: setValue,
				userText: '',
				currentQuestion: 5,
			})
		}
		else if (this.state.currentQuestion == 5){
			//save phone, ask for discipline
			const setValue = this.state.userText; 
			this.setState({
				phone: setValue,
				userText: '',
				currentQuestion: 6,
			})
		}
		else if (this.state.currentQuestion == 6){
			//save phone, ask for discipline
			const setValue = this.state.userText; 
			this.setState({
				discipline: setValue,
				userText:  '',
				currentQuestion: 7,
			})
		}
	}

	registerAction = async () => {
		let response = await fetch(route('/register'), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				utorid: this.state.utorid,
				password: this.state.password,
				name: this.state.name,
				age: this.state.age,
				phone: this.state.phone,
				discipline: this.state.discipline,
			})
		})

		let body = await response.json()
		if(response.ok) {
			if(body.error){
				this.errorAction(body.error)

				this.setState({
					waiting: false
				})
			}else{
				await AsyncStorage.setItem('userToken', JSON.stringify(body))
				this.props.navigation.navigate('App', { user: body, name: body.preferredname })
			}
		}else{
			this.errorAction(body.error)
			this.setState({
				waiting: false
			})
		}
	}

	errorAction(error){
		this.setState({
			error
		})
	}

	render () {
		if (this.state.currentQuestion == 1){
			return (
				<SafeAreaView style={{width:'100%',flex:1, backgroundColor:'rgba(0,0,0,0.01'}}>
					<KeyboardAvoidingView style={{width:'100%',flex:1, justifyContent:'center', alignItems:'center', padding:20}} behaviour="padding">
						<Text style={styles.question}>Please input your preferred name</Text>
						<TextInput
							style={styles.formQuestion}
							multiline={false} 
							placeholder={'Preferred Name'} 
							value={this.state.userText}
							onChangeText={text=>{
								this.setState({userText:text});
							}}
						/>
						<TouchableOpacity onPress={this.nextQuestion} style={{borderWidth:2, margin:15, borderColor:'rgba(0,0,0,0.5)', borderRadius:300}}>
							<Text style={[styles.textStyle,{borderBottomWidth:0, margin:5}]}>Next</Text>
						</TouchableOpacity>
					</KeyboardAvoidingView>
				</SafeAreaView>
			)
		}
		else if (this.state.currentQuestion == 2){
			return (
				<SafeAreaView style={{width:'100%',flex:1, backgroundColor:'rgba(0,0,0,0.01'}}>
					<KeyboardAvoidingView style={{width:'100%',flex:1, justifyContent:'center', alignItems:'center', padding:20}} behaviour="padding">
						<Text style={styles.question}>Here is your UTORid</Text>
						<TextInput
							style={styles.formQuestion}
							multiline={false} 
							placeholder={'UTORid'} 
							value={this.state.userText}
							maxLength = {8}
							onChangeText={text=>{
								this.setState({userText:text});
							}}
						/>
						<TouchableOpacity onPress={this.nextQuestion} style={{borderWidth:2, margin:15, borderColor:'rgba(0,0,0,0.5)', borderRadius:300}}>
							<Text style={[styles.textStyle,{borderBottomWidth:0, margin:5}]}>Next</Text>
						</TouchableOpacity>
					</KeyboardAvoidingView>
				</SafeAreaView>
			)
		}
		else if (this.state.currentQuestion == 3){
			return (
				<SafeAreaView style={{width:'100%',flex:1, backgroundColor:'rgba(0,0,0,0.01'}}>
					<KeyboardAvoidingView style={{width:'100%',flex:1, justifyContent:'center', alignItems:'center', padding:20}} behaviour="padding">
						<Text style={styles.question}>Please input your password</Text>
						<TextInput
							style={styles.formQuestion}
							multiline={false} 
							placeholder={'Password'} 
							secureTextEntry={true}
							value={this.state.userText}
							onChangeText={text=>{
								this.setState({userText:text});
							}}
						/>
						<TouchableOpacity onPress={this.nextQuestion} style={{borderWidth:2, margin:15, borderColor:'rgba(0,0,0,0.5)', borderRadius:300}}>
							<Text style={[styles.textStyle,{borderBottomWidth:0, margin:5}]}>Next</Text>
						</TouchableOpacity>
					</KeyboardAvoidingView>
				</SafeAreaView>
			)
		}
		else if (this.state.currentQuestion == 4){
			return (
				<SafeAreaView style={{width:'100%',flex:1, backgroundColor:'rgba(0,0,0,0.01'}}>
					<KeyboardAvoidingView style={{width:'100%',flex:1, justifyContent:'center', alignItems:'center', padding:20}} behaviour="padding">
						<Text style={styles.question}>Please input your age</Text>
						<TextInput
							style={styles.formQuestion}
							multiline={false} 
							placeholder={'Age (ex. 18)'} 
              value={this.state.userText}
              maxLength = {3}
              keyboardType={'numeric'}
							onChangeText={text=>{
								this.setState({userText:text});
							}}
						/>
						<TouchableOpacity onPress={this.nextQuestion} style={{borderWidth:2, margin:15, borderColor:'rgba(0,0,0,0.5)', borderRadius:300}}>
							<Text style={[styles.textStyle,{borderBottomWidth:0, margin:5}]}>Next</Text>
						</TouchableOpacity>
					</KeyboardAvoidingView>
				</SafeAreaView>
			)
		}
		else if (this.state.currentQuestion == 5){
			return (
				<SafeAreaView style={{width:'100%',flex:1, backgroundColor:'rgba(0,0,0,0.01'}}>
					<KeyboardAvoidingView style={{width:'100%',flex:1, justifyContent:'center', alignItems:'center', padding:20}} behaviour="padding">
						<Text style={styles.question}>Please input your phone number</Text>
						<TextInput
							style={styles.formQuestion}
							multiline={false} 
							placeholder={'Phone Number (ex. 0123456789)'} 
              value={this.state.userText}
              maxLength = {10}
              keyboardType={'numeric'}
							onChangeText={text=>{
								this.setState({userText:text});
							}}
						/>
						<TouchableOpacity onPress={this.nextQuestion} style={{borderWidth:2, margin:15, borderColor:'rgba(0,0,0,0.5)', borderRadius:300}}>
							<Text style={[styles.textStyle,{borderBottomWidth:0, margin:5}]}>Next</Text>
						</TouchableOpacity>
					</KeyboardAvoidingView>
				</SafeAreaView>
			)
		}
		else if (this.state.currentQuestion == 6){
			return (
				<SafeAreaView style={{width:'100%',flex:1, backgroundColor:'rgba(0,0,0,0.01'}}>
					<KeyboardAvoidingView style={{width:'100%',flex:1, justifyContent:'center', alignItems:'center', padding:20}} behaviour="padding">
						<Text style={styles.question}>Please input your major/discipline of study</Text>
						<TextInput
							style={styles.formQuestion}
							multiline={false} 
							placeholder={'Major/Discipline'} 
							value={this.state.userText}
							onChangeText={text=>{
								this.setState({userText:text});
							}}
						/>
						<TouchableOpacity onPress={this.nextQuestion} style={{borderWidth:2, margin:15, borderColor:'rgba(0,0,0,0.5)', borderRadius:300}}>
							<Text style={[styles.textStyle,{borderBottomWidth:0, margin:5}]}>Continue</Text>
						</TouchableOpacity>
					</KeyboardAvoidingView>
				</SafeAreaView>
			)
		}
		else if (this.state.currentQuestion == 7){
			return (
				<SafeAreaView style={{width:'100%',flex:1, backgroundColor:'rgba(0,0,0,0.01'}}>
					<KeyboardAvoidingView style={{width:'100%',flex:1, justifyContent:'center', alignItems:'center', padding:20}} behaviour="padding">
						<Text style={styles.question}>Please review your information below</Text>
						<Text></Text>
						<Text style={styles.question}>Preferred Name: {this.state.name}</Text>
						<Text></Text>
						<Text style={styles.question}>UTORid: {this.state.utorid}</Text>
						<Text></Text>
						<Text style={styles.question}>Age: {this.state.age}</Text>
						<Text></Text>
						<Text style={styles.question}>Phone: {this.state.phone}</Text>
						<Text></Text>
						<Text style={styles.question}>Discipline: {this.state.discipline}</Text>
						<Text></Text>
						<TouchableOpacity onPress={() => {this.setState({waiting:true});}} style={{borderWidth:2, margin:15, borderColor:'rgba(0,0,0,0.5)', borderRadius:300}}>
							<Text style={[styles.textStyle,{borderBottomWidth:0, margin:5}]}>Next</Text>
						</TouchableOpacity>
						<Modal
							visible={this.state.waiting}
							animationType={'none'}
							onRequestClose={() => { this.setState({ waiting: false }); }}
							transparent={true}
						>
							<View style={{flex:1, width:'100%', alignItems:'center', justifyContent:'center', backgroundColor:'rgba(0,0,0,0.5)'}}>
								<ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 40} color={'rgb(100,100,200)'}/>
							</View>
						</Modal>
					</KeyboardAvoidingView>
				</SafeAreaView>
			)
		}
    }
    
}

const styles = StyleSheet.create({
	formQuestion: {
        borderBottomWidth: 1,
        padding: 5,
        borderColor: 'black', 
		width: '50%', 
		fontSize: 20, 
		marginTop: 20,
		marginBottom: 20,
	}, 
	
	question: {
		fontSize: 20,
	},

	textStyle: {
		fontSize:20,
		color:'rgba(0,0,0,0.8)',
		padding:5,
		paddingRight: 10, 
		paddingLeft: 10, 
		margin: 20,
		width:'80%',
		borderBottomWidth:2,
		borderBottomColor:'rgb(0,0,0)',
	},
})



/*  HTML 

<div class='question'>
  <form class="formQuestion">
    <p>Please enter your preferred name</p>
    <input type="text" class="questionAnswer">
    <input type="submit" class="submitButton" value="">
  </form>
</div>

<div class='question'>
  <form class="formQuestion">
    <p>Please enter your e-mail</p>
    <input type="text" class="questionAnswer">
    <input type="submit" class="submitButton" value="">
  </form>
</div>

<div class='question'>
  <form class="formQuestion">
    <p>Please enter your phone number</p>
    <input type="text" class="questionAnswer">
    <input type="submit" class="submitButton" value="">
  </form>
</div>

<div class='question'>
  <form class="formQuestion">
    <p>Please enter your major/discipline</p>
    <input type="text" class="questionAnswer">
    <input type="submit" class="submitButton" value="">
  </form>
</div>

<div class='question'>
  <div class="formQuestion">
    THANK YOU FOR COMPLETING THE FORM! <br>
    <button>henlo</button>
  </div>
</div>


*/ 



/*  JS

$('form').on('submit', function(event) {
		event.preventDefault();
    var nextQuestion = $(this).closest('.question').next(); 
    if (nextQuestion.length !== 0) {
        $('html, body').animate({
            scrollTop: nextQuestion.offset().top 
        }, 1000);
    }
    nextQuestion.children()[0].children[1].focus();
});

*/



/*  CSS

.submitButton{
  border-radius: 50%; 
  border-style: none; 
  background-color: white; 
}

.questionAnswer{
  border-style: none none solid none; 
  border-width: 1px; 
  padding: 5px; 
  border-color: black; 
  width: 50%; 
}

.question{
  height: 100vh; 
}

:focus {
    outline: none !important;
}

.formQuestion{
  position: relative;
  top: 50%;
  transform: translate(0,-50%);
}

*/ 