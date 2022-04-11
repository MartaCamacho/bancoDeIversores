import { useEffect, useState, createRef, useRef, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Animated,
    Image,
    StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getCoinMarket } from '../redux/marketActions';
import { SIZES, COLORS, FONTS, icons } from '../../constants';
import HeaderBar from '../components/HeaderBar';
import TextButton from '../components/TextButton';
import { LineChart } from 'react-native-chart-kit';


const Market = () => {
    const { coins } = useSelector(state => state.marketReducer);
    const dispatch = useDispatch();
    const [ marketTabs, setMarketTabs ] = useState([]);
    const [measureLayout, setMeasureLayout] = useState([]);
    const containerRef = useRef();
    const marketTabScrollViewRef = useRef();

    const onMarketTabPress = useCallback(marketTabIndex => {
        marketTabScrollViewRef?.current?.scrollToOffset({
            offset: marketTabIndex * SIZES.width
        })
    } )
    
    useEffect(() => {
        dispatch(getCoinMarket());
        const marketTabsItems = [
            {
                id: 1,
                title: "Cryptoassets",
            },
            {
                id: 2,
                title: "Exchanges",
            },
        ];
        setMarketTabs(marketTabsItems.map(tab => ({...tab, ref: createRef()})));
        let ml = [];
        marketTabs.forEach(marketTab => {
            marketTab?.ref?.current?.measureLayout(
                containerRef.current, (x, y, width, height) => {
                    ml.push({
                        x, y, width, height
                    });
                    if(ml.length === marketTabs.length) {
                        setMeasureLayout(ml);
                    }
                }
            );
        });
    }, [containerRef.current]);

    const TabIndicator = ({ measureLayout, scrollX, onMarketTabPress }) => {

        const inputRange = marketTabs.map((_, i) => i * SIZES.width);

        const translateX = scrollX.interpolate({
            inputRange,
            outputRange: measureLayout.map(measure => measure.x)
        });
       return (
            <Animated.View style={[ 
                styles.tabIndicator, 
                {transform: [{ translateX }]} 
                ]} />
        )
    }

    const renderTabBar = () => {
        return <View style={styles.tabBar}>
                <View style={{flexDirection: 'row'}} ref={containerRef}>
                {measureLayout.length > 0 && <TabIndicator 
                measureLayout={measureLayout} 
                scrollX={scrollX} 
                onMarketTabPress={onMarketTabPress}
                />}
                {marketTabs.map((item, index) => {
                    return (
                        <TouchableOpacity
                        key={`MarketTab-${index}`}
                        style={{flex: 1}}
                        onPress={() => onMarketTabPress(index)}
                        >
                            <View 
                            ref={item.ref}
                            style={styles.tabBarItem}
                            >
                                <Text style={styles.tabBarItemTitle}>
                                {item.title}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
                
                </View>
        </View>
    }

    const renderButtons = () => {
        return <View style={styles.buttonsContainer}>
            <TextButton label="USD" />
            <TextButton 
            label="% 7d"
            containerStyle={{marginLeft: SIZES.base}} 
            />
            <TextButton 
            label="Top"
            containerStyle={{marginLeft: SIZES.base}} 
            />
        </View>
    }

    const scrollX = useRef(new Animated.Value(0)).current;

    const renderList = () => {

        return <Animated.FlatList
        ref={marketTabScrollViewRef}
        data={marketTabs}
        contentContainerStyle={{ marginTop: SIZES.padding }}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        onScroll={Animated.event([{
            nativeEvent: {contentOffset: {x: scrollX}}}
        ], {useNativeDriver: false})
        }
        renderItem={({item, index}) => {
            return (
                <View style={styles.flatlistContainer}>
                    <FlatList
                        data={coins}
                        keyExtractor={item => item.id}
                        renderItem={({item, index}) => {
                            let priceColor = item.price_change_percentage_7d_in_currency == 0 ? COLORS.lightGray3 :
                        item.price_change_percentage_7d_in_currency > 0 ? COLORS.lightGreen : COLORS.red;
                            return (
                                <View style={styles.flatlistItem}>
                                    <View style={styles.flatlistCoin}>
                                        <Image
                                        source={{ uri: item.image }} 
                                        style={{height: 20, width: 20}}
                                        />
                                        <Text style={styles.coinName}>
                                            {item.name}
                                        </Text>
                                    </View>
                                    <View style={styles.coinChartContainer}>
                                        <LineChart
                                            withVerticalLabels={false}
                                            withHorizontalLabels={false}
                                            withDots={false}
                                            withInnerLines={false}
                                            withVerticalLines={false}
                                            withOuterLines={false}
                                            data={{
                                                datasets: [{ data: item.sparkline_in_7d.price }]
                                            }}
                                            width={100}
                                            height={60}
                                            chartConfig={{ 
                                                color: () => priceColor,
                                                fillShadowGradientFrom: 'transparent',
                                                fillShadowGradientTo: 'transparent'
                                                 }}
                                            bezier
                                            style={{paddingRight: 0}}
                                        />
                                    </View>
                                    <View style={styles.figuresContainer}>
                                            <Text style={styles.figuresItem}>
                                            $ {item.current_price}
                                            </Text>
                                            <View style={[styles.figuresContainer, {flexDirection: 'row'}]}>
                                                {
                                                item.price_change_percentage_7d_in_currency != 0 && <Image 
                                                source={icons.upArrow}
                                                style={{
                                                    height: 10,
                                                    width: 10,
                                                    tintColor: priceColor,
                                                    transform: item.price_change_percentage_7d_in_currency > 0 ? 
                                                    [{rotate: '45deg'}] : [{rotate: '125deg'}]
                                                }}
                                                />
                                                }
                                                <Text style={[{color: priceColor}, styles.figuresPercentage]}>
                                                {item.price_change_percentage_7d_in_currency.toFixed(2)}%
                                                </Text>
                                            </View>
                                    </View>
                                </View>
                            )
                        }}
                    />
                </View>
            )
        }}
        >

        </Animated.FlatList>
    }
    
    return (
        <View style={styles.body}>
            <Text>Market</Text>
            <HeaderBar title={'Market'}/>
            {renderTabBar()}
            {renderButtons()}
            {renderList()}
        </View>
    )
}

export default Market;

const styles = StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: COLORS.black,
    },
    tabBar: {
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.radius,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.gray
    },
    tabBarItem: {
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40
    },
    tabBarItemTitle: {
        color: COLORS.white,
        ...FONTS.h3
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.radius
    },
    flatlistContainer: {
        flex: 1,
        width: SIZES.width
    },
    flatlistItem: {
        flexDirection: 'row',
        paddingHorizontal: SIZES.padding,
        marginBottom: SIZES.radius
    },
    flatlistCoin: {
        flex: 1.5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    coinName: {
        marginLeft: SIZES.radius,
        color: COLORS.white,
        ...FONTS.h3
    },
    coinChartContainer: {
        flex: 1,
        alignItems: 'center'
    },
    figuresContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    figuresItem: {
        color: COLORS.white,
        ...FONTS.h4
    },
    figuresPercentage: {
        marginLeft: 5,
        ...FONTS.body5,
        lineHeight: 15
    },
    tabIndicator: {
        position: 'absolute',
        left: 0,
        height: '100%',
        width: (SIZES.width - (SIZES.radius * 2)) / 2,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray
    }
  })