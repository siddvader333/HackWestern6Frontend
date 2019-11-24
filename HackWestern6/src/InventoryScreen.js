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

const rhino_pic = <Image source={require('../assets/Rhino.png')} resizeMode="cover"/>;
const z_saber_pic = <Image source={require('../assets/Z-saber.png')} resizeMode="cover"/>;
const boltace_pic = <Image source={require('../assets/Boltace.png')} resizeMode="cover"/>;
const longsword_pic = <Image source={require('../assets/Longsword.png')} resizeMode="cover"/>;
const watermelon_pic = <Image source={require('../assets/Watermelon.png')} resizeMode="cover"/>;
export default class extends Component {
    constructor(props) {
        super(props) 
        this.state = { 
            user: this.props.navigation.getParam('user',null),
            user_gold: 0,
            inventoryAttributes: ['Item ID', 'Artifacts', 'Gold', 'Preview'],
            title:["Your Artifacts!"],
            index:'0',

            artifacts: [],
            cost: [
                {'0': 1000}, 
                {'1': 500},
                {'2': 250},
                {'3': 100},
                {'4': 50} 
             ],
             pictures: [
                {'Rhino': rhino_pic},
                {'Z-saber': z_saber_pic},
                {'Boltface': boltace_pic},
                {'Longsword': longsword_pic},
                {'Watermelon': watermelon_pic} 
            ]
        }
    }
    getImgArray(artifacts_arr){
        const index_arr = []
        const arr_img = []
        for(var i = 0; i< artifacts_arr.length; i++){
            index_arr.push(artifacts_arr[i].item)
        }
        for(var j = 0; j < index_arr.length; j++){
            arr_img.push(this.state.pictures[index_arr[j]])
        }

        return arr_img;    
    }

    componentDidMount(){
        this.setState({
            user: this.inventoryAction(),
            artifacts: getImgArray(this.state.user.user.questData.inventory),
            user_gold: this.state.user.user.questData.gold
        })
     }
     
     render() {
     
         return(
          <ScrollView horizontal={true}>
              <View style = {styles.container}>
                      <Text textStyle ={styles.text}>Your Inventory!</Text>
                      <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                      <ScrollView style={styles.dataWrapper}>
                      <Row data = {this.state.title} style={styles.header} textStyle={styles.text}/>
                      <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                          <Rows
                              data={this.state.artifacts} 
                          />
                      </Table>
                      </ScrollView>
                      </Table>
                  </View>
          </ScrollView>
         )
     }
}

inventoryAction = async() => {
    if(!this.state.user){
        console.error("UTorId invalid")
    }

    else{
        // do some error handling here first 
        let response = await fetch(route('/inventory'),{
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                utorid:this.state.user.user.utorid
            })
        })
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