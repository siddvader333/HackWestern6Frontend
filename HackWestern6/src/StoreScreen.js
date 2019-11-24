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

const rhino_pic = <Image source={require('../assets/Rhino.png')} resizeMode="cover"/>
const z_saber_pic = <Image source={require('../assets/Z-saber.png')} resizeMode="cover"/>
const boltace_pic = <Image source={require('../assets/Boltace.png')} resizeMode="cover"/>
const longsword_pic = <Image source={require('../assets/Longsword.png')} resizeMode="cover"/>
const watermelon_pic = <Image source={require('../assets/Watermelon.png')} resizeMode="cover"/>
export default class extends Component {
   constructor(props) {
      super(props) 
      this.state = { 
        user: this.props.navigation.getParam('user',null),
        storeAttributes: ['Store ID', 'Name', 'Rubies', 'Description'],

        artifacts: [
            [rhino_pic],
            [z_saber_pic],
            [boltace_pic],
            [longsword_pic],
            [watermelon_pic]
         ]
      }
   }

   componentDidMounts(){
      this.setState({
          user: this.props.navigation.getParam('user',null)
      })
   }
   
   render() {
   
       return(
        <ScrollView vertical={true}>
            <View style = {styles.container}>
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
                </View>
        </ScrollView>
       )
   }

}

shoppingAction = async() => {

    

}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 15, paddingTop: 30, backgroundColor: '#fff' },
    header: { height: 50, backgroundColor: '#537791' },
    text: { textAlign: 'center', fontWeight: '100' },
    dataWrapper: { marginTop: -1 },
    align:{alignItems:'center', justifyContent:'center'},
    row: { height: 40, backgroundColor: '#E7E6E1' }
  });