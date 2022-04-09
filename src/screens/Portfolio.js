import { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import { getHoldings } from '../redux/marketActions';
import { useFocusEffect } from '@react-navigation/native';

const Portfolio = () => {

    return (
        <View>
            <Text>Portfolio</Text>
        </View>
    )
}

export default Portfolio;