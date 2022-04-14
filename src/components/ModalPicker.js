import { StyleSheet, Text, View, Dimensions, Picker, ScrollView } from 'react-native'
import React from 'react';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ModalPicker = ({showModal}) => {
  return (
    <View
    onPress={() => close(false)}
    style={styles.container}
    >
    </View>
  )
}

export default ModalPicker

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: 10
    }
})