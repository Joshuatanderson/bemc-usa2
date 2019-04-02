import React from 'react';
import {View, StyleSheet, Button, TextInput} from 'react-native';
import PropTypes from 'prop-types';

const Input = ({currentText, handlePlaceSubmit, handleTextInput}) => {
    return(
        <View style = {styles.inputContainer}>
          <TextInput
            style={styles.placeInput}
            value={currentText}
            placeholder="Awesome places"
            onChangeText={handleTextInput}
          />
          <Button
            style = {styles.placeBtn}
            title='Add'
            onPress = {handlePlaceSubmit}
          />
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        // flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    placeInput: {
        width: '70%',
    },
    placeBtn: {
        width: '30%',
    },
})

Input.propTypes = {
    currentText: PropTypes.string.isRequired,
    handlePlaceSubmit: PropTypes.func.isRequired,
    handleTextInput: PropTypes.func.isRequired
}

export default Input;