import React, { Component } from 'react';
import { 
	Text,
	TextInput,
	View,
	SafeAreaView,
    StyleSheet,
    ScrollView,
	KeyboardAvoidingView,
	TouchableOpacity,
	AsyncStorage
} from 'react-native';

import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

export default class extends Component {
   constructor(props) {
      super(props) //since we are extending class store so we have to use super in order to override Component class constructor
      this.state = { 
        storeAttributes: ['Store ID', 'Name', 'Rubies', 'Description'],
        artifacts: [
            [ 1, 'TrueBlues mascot head', 500, 'Wearing this will make you stronger than neckbeards love for Jordan Peterson' ],
            [ 2, 'Space Cthulhu Head', 250, 'N P - C O M P L E T E' ],
            [ 3, 'Moon rocks', 100, 'Oh yeah like moondust but T H I C C' ],
            [ 4, 'Moondust', 50, 'The real reason NASA wanted to go to the moon' ]
         ]
      }
   }
   
   render() {
   
       return(
        <ScrollView vertical={true}>
            <View style = {styles.container}>
                    <Text>Welcome to the Store!</Text>
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

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    header: { height: 50, backgroundColor: '#537791' },
    text: { textAlign: 'center', fontWeight: '100' },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: '#E7E6E1' }
  });