import { StyleSheet, Text, Pressable } from 'react-native';

const ButtonComponent = (props) => {
  return (
    <Pressable
            onPress={props.onPressFunction}
            hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
            android_ripple={{ color: '#00000050' }}
            style={({ pressed }) => [
                { backgroundColor: pressed ? '#dddddd' : props.color },
                styles.button,
                { ...props.style }
            ]}
        >
            <Text style={styles.text}>
                {props.title}
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