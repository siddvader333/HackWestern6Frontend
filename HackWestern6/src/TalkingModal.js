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

export default class extends React.Component {
	constructor(props){
		super(props)
	}

	render () {
		return (
			<Modal
				visible={this.props.visible}
				animationType={'slide'}
				onRequestClose={() => { this.setState({ visible: false }); }}
				transparent={true}
			>
				<TouchableWithoutFeedback onPress={this.props.onPress} style={{flex:1, width:'100%'}}>
					<View style={{flex:1, width:'100%', alignItems:'center', justifyContent:'center', backgroundColor:'rgba(0,0,0,0.5)'}}>
						<View style={{width:'80%', padding:10, margin:20, backgroundColor:'rgb(220,220,220)', borderWidth:5, borderColor:'rgb(40,40,40)',borderRadius:50}}>
							<Text style={styles.textStyle}>{this.props.text}</Text>
						</View>
						<Image
							style={{margin:30,width:'30%', height:'30%'}}
							source={require('../assets/astronaut.png')}
							resizeMode="contain"
						/>
						<Text style={[styles.textStyle, {fontSize:15, marginTop:30, textAlign:'center',color:'white'}]}>Click Anywhere to Continue</Text>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		)
	}
}

const styles = StyleSheet.create({
	textStyle: {
		fontSize:20,
		color:'rgba(0,0,0,0.8)',
		padding:5,
		margin: 20,
		marginBottom:10,
		width:'80%',
	}
})