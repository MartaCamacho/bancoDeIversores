import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import Home from '../screens/Home';
import Portfolio from '../screens/Portfolio';
import Market from '../screens/Market';
import Settings from '../screens/Settings';
import { TabIcon } from '../components';
import { COLORS, icons } from "../../constants";
import CoinDetails from '../screens/CoinDetails';

const Tab = createBottomTabNavigator();
const CyptoStack = createStackNavigator();

const CryptoDetailsScreen = () => {
  return (
  <CyptoStack.Navigator>
    <CyptoStack.Screen name="CryptoDetailsHome" component={Home} />
    <CyptoStack.Screen name="CryptoDetails" component={CoinDetails} />
  </CyptoStack.Navigator>
  )
}

const TabNavigatorComponent = () => {
  
  return (
    <Tab.Navigator
            screenOptions={{
                headerStyle: { height: 0 },
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: COLORS.primary,
                    borderTopColor: "transparent",
                    height: 70
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={CryptoDetailsScreen}
                options={{
                  tabBarIcon: ({focused}) => {
                    return (
                      <TabIcon 
                        focused={focused}
                        icon={icons.home}
                        label='Home'
                      />
                    )
                  }
                }}
            />
            <Tab.Screen
                name="Portfolio"
                component={Portfolio}
                options={{
                  tabBarIcon: ({focused}) => {
                    return (
                      <TabIcon 
                        focused={focused}
                        icon={icons.briefcase}
                        label='Portfolio'
                      />
                    )
                  }
                }}
            />
            <Tab.Screen
                name="Market"
                component={Market}
                options={{
                  tabBarIcon: ({focused}) => {
                    return (
                      <TabIcon 
                        focused={focused}
                        icon={icons.market}
                        label='Market'
                      />
                    )
                  }
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                  tabBarIcon: ({focused}) => {
                    return (
                      <TabIcon 
                        focused={focused}
                        icon={icons.profile}
                        label='Settings'
                      />
                    )
                  }
                }}
            />
            
        </Tab.Navigator>
  )
}

export default TabNavigatorComponent
