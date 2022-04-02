import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Portfolio from '../screens/Home';
import Market from '../screens/Home';
import Settings from '../screens/Home';
import { COLORS } from "../../constants";

const Tab = createBottomTabNavigator();

const TabNavigatorComponent = () => {
  return (
    <Tab.Navigator
            tabBarOptions={{
                style: {
                    backgroundColor: COLORS.primary,
                    borderTopColor: "transparent",
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
            />
            <Tab.Screen
                name="Portfolio"
                component={Portfolio}
            />
            <Tab.Screen
                name="Trade"
                component={Home}
            />
            <Tab.Screen
                name="Market"
                component={Market}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
            />
        </Tab.Navigator>
  )
}

export default TabNavigatorComponent
