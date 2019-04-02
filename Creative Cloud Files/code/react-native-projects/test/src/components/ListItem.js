import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const ListItem = ({placeName, placeImage, handleItemPressed}) => {
    return(
        <TouchableOpacity 
            onPress = {handleItemPressed}
        >
            <View 
                style = {styles.listItem}
            >   
                <Image
                    style = {styles.placeImage}
                        //image uri info
                    source = {{uri: `${placeImage.uri}`}}
                />

                <Text>
                    {placeName}
                </Text>

            </View>
        </TouchableOpacity>
        
    );
}

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        marginBottom: 5,
        backgroundColor: '#eee'
    },
    placeImage: {
        height: 40,
        width: 40,
        marginRight: 8
    }
})

export default ListItem;