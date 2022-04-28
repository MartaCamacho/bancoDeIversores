import { StyleSheet, Text, Pressable } from 'react-native';

/**
 * Button component
 * @typedef PropType
 * @property {Function} onPressFunction what the button does when clicked
 * @property {String} color button background color
 * @property {Object} [style] additional styilings
 * @property {String} title text inside the button
 */

const ButtonComponent = ({ onPressFunction, color, style, title }) => {
  return (
    <Pressable
            onPress={onPressFunction}
            hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
            android_ripple={{ color: '#00000050' }}
            style={({ pressed }) => [
                { backgroundColor: pressed ? '#dddddd' : color },
                styles.button,
                { ...style }
            ]}
        >
            <Text style={styles.text}>
                {title}
            </Text>
        </Pressable>
  )
}

export default ButtonComponent

const styles = StyleSheet.create({
    text: {
        color: '#ffffff',
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
    },
    button: {
        width: 300,
        height: 50,
        alignItems: 'center',
        borderRadius: 5,
        margin: 10,
        maxWidth: '95%'
    },
})