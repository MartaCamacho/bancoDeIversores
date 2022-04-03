import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Portfolio from '../screens/Portfolio';
import Market from '../screens/Market';
import Settings from '../screens/Settings';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import { TabIcon } from '../components';
import { COLORS, icons } from "../../constants";

const Tab = createBottomTabNavigator();

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
                component={Home}
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
                name="Trade"
                component={Home}
                options={{
                  tabBarIcon: ({focused}) => {
                    return (
                      <TabIcon 
                        focused={focused}
                        icon={icons.trade}
                        label='Trade'
                        isTrade={true}
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
            {/* <Tab.Screen
                name="Login"
                component={Login}
            />
            <Tab.Screen
                name="Signup"
                component={Signup}
            /> */}
        </Tab.Navigator>
  )
}

export default TabNavigatorComponent
