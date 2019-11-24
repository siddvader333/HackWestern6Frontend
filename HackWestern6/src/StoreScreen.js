import React, { Component } from 'react';
import { 
	Text,
    TextInput,
    View,
    Image,
	SafeAreaView,
    StyleSheet,
    ScrollView,
	KeyboardAvoidingView,
	TouchableOpacity,
	AsyncStorage
} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import route from '../api.js';
import TalkingModal from './TalkingModal.js'

const rhino_pic = (<Image key = '0' source={require('../assets/Rhino.png')} resizeMode="cover"/>)
const z_saber_pic = <Image key = '1' source={require('../assets/Z-saber.png')} resizeMode="cover"/>
const boltace_pic = <Image key = '2' source={require('../assets/Boltace.png')} resizeMode="cover"/>
const longsword_pic = <Image key = '3'source={require('../assets/Longsword.png')} resizeMode="cover"/>
const watermelon_pic = <Image key = '4' source={require('../assets/Watermelon.png')} resizeMode="cover"/>
export default class extends Component {
   constructor(props) {
      super(props);
      this.state = { 
        talkText: '',
        user: this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().getParam('user',null),
        storeAttributes: ['Artifacts!'],
        index:'0',

        artifacts: [
            [<TouchableOpacity onPress={() => {this.setState({index:'0'}); this.shoppingAction();}}>
                {rhino_pic}
            </TouchableOpacity>],

            [<TouchableOpacity onPress={()=>{this.setState({index:'1'}); this.shoppingAction();}}>
                {z_saber_pic}
            </TouchableOpacity>],

        [<TouchableOpacity onPress={()=>{this.setState({index:'2'}); this.shoppingAction();}}>
            {boltace_pic}
            </TouchableOpacity>],

            [<TouchableOpacity onPress={()=>{this.setState({index:'3'}); this.shoppingAction()}}>
                {longsword_pic}
                </TouchableOpacity>],

            [<TouchableOpacity onPress={()=>{this.setState({index:'4'}); this.shoppingAction();}}>
                {watermelon_pic}
                </TouchableOpacity>]
         ],

         costs: {
             '0':1000,
             '1':500,
             '2':250,
             '3':100,
             '4':50
         },
         names:{
            '0':'Rhino',
            '1':'Z-saber',
            '2':'Boltace',
            '3':'Longsword',
            '4':'Watermelon'
         },
         showModal:false, 
         modal_text:''
      }
      this.shoppingAction = this.shoppingAction.bind(this)
   }

   shoppingAction = async() => {
    // get the user information such as UTorID and gold/PNP points
        console.log(this.state.user)
        if(!this.state.user){
            console.log("Error1")
        }

        if(this.state.user.questData.gold < this.state.costs[this.state.index]){
            this.setState({ talkText: 'You don\'t have enough gold to buy this!' })
        }
        // do error handling
        else{
        // best to do this as a promise so i can invoke loading activity indicator
        let response = await fetch(route('/buy_item'), {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                item: this.state.names[this.state.index],
                cost: this.state.costs[this.state.index],
                img: this.state.artifacts[this.state.index][0],
                utorid: this.state.user.utorid 
                })
            })
        let temp = await response.json()
            if(response.ok){
                this.setState({
                  talkText: temp.message
                })
            }else{
                this.setState({
                  talkText: temp.error
                })
            }
        }
    }

   componentDidMount(){
      this.setState({
        user: this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().getParam('user',null)
      })
   }
   
   render() {
    // console.log(this.state)
       return(
        <ScrollView vertical={true}>
            <View style = {styles.container}>
                    <TalkingModal
						visible={this.state.showModal}
						onPress={() => {
							this.setState({ showModal: !this.state.showModal });
						}}
						text={this.state.modalText}
					/>
                    <Text textStyle ={styles.text}>Welcome to the Store!</Text>
                    <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                    <ScrollView style={styles.dataWrapper}>
                    <Row data ={this.state.storeAttributes} style={styles.header} textStyle={styles.text}/>
                    <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                        <Rows
                            data={this.state.artifacts}
                        />
                    </Table>
                    </ScrollView>
                    </Table>
                    <TalkingModal
                      visible={this.state.talkText ? true : false}
                      onPress={() => {
                        this.setState({ talkText: '' });
                      }}
                      text={this.state.talkText}
                    />
                </View>
        </ScrollView>
       )
   }

}


const styles = StyleSheet.create({
    container: { flex: 1, padding: 15, paddingTop: 30, backgroundColor: '#fff' },
    header: { height: 50, backgroundColor: '#537791' },
    text: { textAlign: 'center', fontWeight: '100' },
    dataWrapper: { marginTop: -1 },
    align:{alignItems:'center', justifyContent:'center'},
    row: { height: 40, backgroundColor: '#E7E6E1' }
  });