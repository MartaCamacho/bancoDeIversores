import { Text, View, Image, StyleSheet } from 'react-native';
import { SIZES, COLORS, FONTS, icons } from '../../constants';

const BalanceInfo = ({ title, displayAmount, changePct, containerStyle }) => {
    return (
        <View style={{...containerStyle}}>
          <Text style={styles.textH3}>
          {title}
          </Text>

          <View style={styles.sectionContainer}>
            <Text style={styles.textH3}>$</Text>
            <Text style={styles.figuresText}>{displayAmount.toLocaleString()}</Text>
            <Text style={styles.textH3}>USD</Text>
          </View>

          <View style={styles.sectionContainer}>
            {changePct != 0 && <Image
                source={icons.upArrow}
                style={[styles.changeImage, {
                    tintColor: (changePct > 0) ? COLORS.lightGreen : COLORS.red,
                    transform: (changePct > 0) ? [{rotate: '45deg'}] : [{rotate: '125deg'}]
                    }]}
            />}
            <Text
            style={{
                marginLeft: SIZES.base,
                alignSelf: 'flex-end',
                color: (changePct === 0) ? COLORS.lightGray3 : (changePct > 0) ? COLORS.lightGreen : COLORS.red,
                ...FONTS.h4
            }}>
                {changePct.toFixed(2)}%
            </Text>

            <Text style={styles.changePeriod}>
                7d change
            </Text>
          </View>
        </View>
      )
}

export default BalanceInfo

const styles = StyleSheet.create({
    textH3: {
        ...FONTS.h3,
        color: COLORS.lightGray3
    },
    sectionContainer: {
        flexDirection: 'row', 
        alignItems: 'flex-end'
    },
    figuresText: {
        marginLeft: SIZES.base, 
        ...FONTS.h2,
        color: COLORS.white
    },
    changeImage: {
        width: 10,
        height: 10,
        alignSelf: 'center',
    },
    changePeriod: {
        marginLeft: SIZES.radius,
        alignSelf: 'flex-end',
        color: COLORS.lightGray3,
        ...FONTS.h5
    }
  })