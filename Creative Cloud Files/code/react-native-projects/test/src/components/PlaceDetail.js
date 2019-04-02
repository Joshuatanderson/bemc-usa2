import React from 'react';
import {View, Modal, Image, Text, Button, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const PlaceDetail = ({selectedPlace, onModalClosed, onModalDeleted}) => {
    let modalContent = null;

        //define content only if it is defined
    if(selectedPlace !== null) {modalContent =
        (
            <View>
                <Image 
                    style = {styles.placeImage}
                    source = {{uri: `${selectedPlace.image.uri}`}}
                />
                <Text
                    style = {styles.placeName}
                >
                    {selectedPlace.name}
                </Text>
            </View>
        )
    }
    return (
        <Modal 
                //this is for the android hard-coded back button (Android only)
            onRequestClose = {onModalClosed}
            visible = {selectedPlace !== null}
            animationType = 'slide'
        >
            <View style = {styles.modalContainer}>
                {modalContent}
                <View>
                    <Button 
                        title = 'delete'
                        color = 'red'
                        onPress = {onModalDeleted}
                    />
                    <Button 
                        title = 'close'
                        onPress = {onModalClosed}
                    />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        margin: 40 
    },
    placeImage: {
        width: '100%',
        height: 200,
    },
    placeName: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 28,
    }
})

PlaceDetail.propTypes = {
    selectedPlace: PropTypes.any,
    onModalClosed: PropTypes.func.isRequired,
    onModalDeleted: PropTypes.func.isRequired
}

export default PlaceDetail;