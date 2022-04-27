import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from 'react-redux';
import { COLORS, icons } from "../../constants";
import TabIcon from '../components/TabIcon';
import Signup from "../screens/Signup";
import Login from "../screens/Login";
import Home from '../screens/Home';
import Portfolio from '../screens/Portfolio';
import Settings from '../screens/Settings';
import CoinDetails from '../screens/CoinDetails';

const Tab = createBottomTabNavigator();
const CyptoStack = createStackNavigator();
const AuthStack = createStackNavigator();

const CryptoDetailsScreen = () => {
  return (
  <CyptoStack.Navigator
    screenOptions={{
      headerShown: false
    }}>
    <CyptoStack.Screen name="CryptoDetailsHome" component={Home} />
    <CyptoStack.Screen name="CryptoDetails" component={CoinDetails} />
  </CyptoStack.Navigator>
  )
}

const TabNavigatorComponent = () => {
  const { logged } = useSelector(state => state.useReducer);
  
  return (
    logged ? 
    <Tab.Navigator
            screenOptions={{
                headerStyle: { height: 0 },
                headerShown: false,
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
                  headerShown: false,
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
        :
         <AuthStack.Navigator
            screenOptions={{
            headerStyle: { height: 0 }
        }}>
            <AuthStack.Screen 
            name="Login"
            component={Login}
              />
            <AuthStack.Screen 
            name="Signup"
            component={Signup}
              />
        </AuthStack.Navigator> 
  )
}

export default TabNavigatorComponent
