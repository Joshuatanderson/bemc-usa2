import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

import ListItem from './ListItem';

const ListItems = ({places, onItemSelected}) => {
    return(
        <FlatList 
          style = {styles.listContainer}
          data = {places}
            // info contains index and other info
          renderItem = {(info) => (
              <ListItem 
                  //info.item is the place item
                placeName = {info.item.name} 
                placeImage = {info.item.image}
                  //calls onItemDeleted against the key
                handleItemPressed = {() => onItemSelected(info.item.key)}
            />
          )}
        >
        </FlatList>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        width: '100%',
    }
})

ListItems.propTypes = {
    places: PropTypes.array.isRequired,
}

export default ListItems;