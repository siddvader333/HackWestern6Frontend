import React from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Modal, Platform } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import route from '../api.js'
import TalkingModal from './TalkingModal.js'

export default class CameraExample extends React.Component {
	constructor(props){
		super(props)

		this.state = {
		    hasCameraPermission: null,
		    type: Camera.Constants.Type.back,
		    waiting: null,
			user: this.props.navigation.dangerouslyGetParent().getParam('user', null),
			talkText: '',
		};

		this.snap = this.snap.bind(this)
	}

	snap = async () => {
		if (this.camera) {
			let { base64 } = await this.camera.takePictureAsync({ base64: true });

			// let response = await fetch(route('/isFood'), {
			// 	method: 'POST',
			// 	headers: {
			// 	    Accept: 'application/json',
			// 	    'Content-Type': 'application/json',
			// 	},
			// 	body: JSON.stringify({
			// 		image: base64
			// 	})
			// })

			const data = {
				requests: [
					{
						image: {
							content: base64
						},
						features: [
							{
								type: 'LABEL_DETECTION',
								maxResults: 10
							}
						]
					}
				]
			};

			let isFood = false;

			const resp = await fetch('https://vision.googleapis.com/v1/images:annotate?key=' + 'AIzaSyBkJGBKyJPO58AuQ1QGvguIpgF4Usq46ds', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});

			const respJSON = await resp.json();

			let temp_user = this.state.user;

			if(!respJSON){
				this.setState({
					talkText:'Error!',
					waiting:false
				})
				return
			}

			for (let i = 0; i < respJSON.responses[0].labelAnnotations.length; i++) {
				if (respJSON.responses[0].labelAnnotations[i].description == 'Food') {
					isFood = true
				}
			}

			if(isFood){
				temp_user.completedMorningTasks = true
				temp_user.questData.gold += 10
				this.setState({
					talkText: 'That\'s food! You received ten (10) gold!',
					user: temp_user
				})

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

				response = await fetch(route('/completedMorningTasks'), {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						utorid: this.state.user.utorid
					})
				});

				this.props.navigation.dangerouslyGetParent().setParams({user: temp_user})
			}else
				this.setState({
					talkText: 'That\'s not food!'
				})

			this.setState({
				waiting:false
			})

			// if(response.ok) {
			// 	let body = await response.json()
			// 	if(body.isFood){
			// 		alert('That\'s Food!')
			// 		this.setState({
			// 			waiting: false
			// 		})
					
			// 	}else{
			// 		alert('That\'s Not Food!')
			// 		this.setState({
			// 			waiting: false
			// 		})
			// 	}
			// }else{
			// 	alert('Failed Connecting to Services')
			// 	this.setState({
			// 		waiting: false
			// 	})
			// }
		}
	};

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ 
    	hasCameraPermission: status === 'granted',
		type: Camera.Constants.Type.back,
		waiting: false, 
		user: this.props.navigation.dangerouslyGetParent().getParam('user', null),
	});
  }

  	componentDidUpdate(prevProps, prevState){
  		if(prevState.waiting != this.state.waiting && this.state.waiting)
  			this.snap()
  	}

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
			<Camera
				style={{ flex: 1 }} type={this.state.type}
				ref={ref => {
					this.camera = ref;
				}}
			>
            <View
              style={{
                flex: 1,
                width:'100%',
                backgroundColor: 'transparent',
              }}>
              	<TouchableOpacity
                style={{
                  flex: 1,
                  width:'100%',
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    waiting:true
                  });
                }}>
              
                <View />
              </TouchableOpacity>
            </View>
          </Camera>
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
			<TalkingModal
              visible={this.state.talkText ? true : false}
              onPress={() => {
                this.setState({ talkText: '' });
                if(this.state.user.completedMorningTasks)
			this.props.navigation.goBack()
              }}
              text={this.state.talkText}
            />
        </View>
      );
    }
  }
}