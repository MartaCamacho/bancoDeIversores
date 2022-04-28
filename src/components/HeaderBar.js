import { StyleSheet, Text, View } from 'react-native';
import { SIZES, COLORS, FONTS } from '../../constants';

/**
 * Generic header
 * @typedef PropType
 * @property {String} title button background color
 */

const HeaderBar = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
      {title}
      </Text>
    </View>
  )
}

export default HeaderBar

const styles = StyleSheet.create({
    container: {
        height: 100,
        paddingHorizontal: SIZES.radius,
        justifyContent: 'flex-end'
    },
    title: {
        color: COLORS.white,
        ...FONTS.largeTitle    
    }
})