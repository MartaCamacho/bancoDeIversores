import { View, Text, Modal, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import ButtonComponent from './ButtonComponent';
import { SIZES, COLORS } from '../../constants';

/**
 * User settings modal component
 * @typedef PropType
 * @property {Boolean} modalOpen show if the modal sould be open or not
 * @property {Function} closeModal function to close the modal
 * @property {String} currentValue input default value
 * @property {String} newInputValue input modified value
 * @property {String} title modal specific field name to modify
 * @property {String} keyboardInputType type of keyboard shown depending on the input
 * @property {Boolean} [isPassword] check if the modal is for modifying password
 * @property {Function} handleSave function executed on button press
 * @property {String} [newInputValue2] input modified value of the second input (if needed)
 * @property {String} [currentValue2] input default value of the second input (if needed)
 * @property {String} errorMessage error message if the input data is not correct
 * @property {String} [errorMessage2] error message if the input data is not correct
 * @property {Function} onFocus function to remove errors (if any)
 * @property {Function} [onFocus2] function to remove errors (if any) on the second input (if needed)
 * @property {Function} onBlur function to check if the input is correct
 * @property {Function} [onBlur2] function to check if the input is correct (if needed)
 * @property {Object} [customContent] custom HTML content in case the generic input is not enough
 */

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