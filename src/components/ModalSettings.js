import { View, Text, Modal, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import ButtonComponent from './ButtonComponent';
import { SIZES, COLORS } from '../../constants';

const ModalSettings = ({ modalOpen, closeModal, currentValue, newInputValue, title, 
    keyboardInputType, isPassword, handleSave, newInputValue2, currentValue2, errorMessage,
    errorMessage2, onFocus, onFocus2, onBlur, onBlur2, customContent }) => {

  const errorMessageText = (field) => <Text style={styles.errorMessage}>{field}</Text>;

  const handleSubmit = () => {
    if(errorMessage === '' && newInputValue !== '') {
      handleSave();
      closeModal(false);
    }
  }

  return (
    <Modal
          animationType='fade'
          visible={modalOpen}
          onRequestClose={() => closeModal(false)}
          >
            <View style={styles.modal}>
                {customContent ? customContent() : 
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>Change {title}:</Text>
                    <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => newInputValue(text)}
                    defaultValue={currentValue}
                    editable={true}
                    multiline={false}
                    maxLength={40}
                    keyboardType={keyboardInputType ? keyboardInputType : 'default'}
                    secureTextEntry={isPassword}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    />
                    {errorMessage ? errorMessageText(errorMessage) : <></>}
                    {isPassword && 
                    <>
                        <Text style={[styles.modalText, {marginTop: 20}]}>Repeat {title}:</Text>
                        <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => newInputValue2(text)}
                        defaultValue={currentValue2}
                        editable={true}
                        multiline={false}
                        maxLength={40}
                        keyboardType={keyboardInputType ? keyboardInputType : 'default'}
                        secureTextEntry={isPassword}
                        onFocus={onFocus2}
                        onBlur={onBlur2}
                        />
                    </>
                    }
                    {errorMessage2 ? errorMessageText(errorMessage2) : <></>}
                </View>
                    }
                
                <TouchableOpacity
                style={styles.saveButton}
                >
                    <View>
                        <ButtonComponent
                        title="Save"
                        color='#B0191E'
                        onPressFunction={() => handleSubmit()}
                        />
                        <ButtonComponent
                        title="Close"
                        style={styles.closeButtonContent}
                        color={COLORS.black}
                        onPressFunction={() => closeModal(false)}
                        />
                    </View>
                </TouchableOpacity>
            </View>
          </Modal>
  )
}

export default ModalSettings;

const styles = StyleSheet.create({
    modal: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      color: COLORS.white,
      backgroundColor: COLORS.black
    },
    modalContent: {
        marginTop: 100
    },
    modalText: {
      color: COLORS.white,
      width: 300,
      maxWidth: '95%',
      paddingHorizontal: SIZES.padding / 2,
    },
    textInput: {
      backgroundColor: COLORS.white,
      borderColor: COLORS.border,
      borderWidth: 1,
      paddingHorizontal: SIZES.padding / 2,
      width: 300,
      height: 50,
      alignItems: 'center',
      borderRadius: 5,
      margin: 10,
      maxWidth: '95%'
    },
    saveButton: {
      borderRadius: 5,
    },
    errorMessage: {
        color: '#B0191E',
        width: 300,
        marginHorizontal: 10,
        maxWidth: '95%',
    },
    closeButtonContent: {
        borderWidth: 1,
        borderColor: COLORS.white
    }
})