import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';

/**
 * Small text button
 * @typedef PropType
 * @property {String} label text
 * @property {Object} [containerStyle] additional stylings
 * @property {Function} onPress what button does when pressed
 * @property {Boolean} active shows if the button is selected
 */
const TextButton = ({ label, containerStyle, onPress, active }) => {
  return (
    <TouchableOpacity style={[styles.container, {...containerStyle}, active && styles.buttonActive]} onPress={onPress}>
        <Text style={styles.text}>
            {label}
        </Text>
    </TouchableOpacity>
  )
}

export default TextButton

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 3,
        paddingHorizontal: 18,
        backgroundColor: COLORS.gray1,
        borderRadius: SIZES.radius
    },
    text: {
        color: COLORS.white,
        ...FONTS.h3
    },
    buttonActive: {
        backgroundColor: COLORS.lightGray3,
        fontWeight: 'bold'
    }
})