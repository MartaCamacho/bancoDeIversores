import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { Store } from './src/redux/store';
import Signup from "./src/screens/Signup";

import Tabs from "./src/components/TabNavigatorComponent";
import Login from "./src/screens/Login";

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

const App = () => {
    
    return (
        <Provider store={Store}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                    initialRouteName={'MainLayout'}
                >
                    <Stack.Screen
                        name="MainLayout"
                        component={Tabs}
                    />
                </Stack.Navigator>
                {/* <AuthStack.Navigator
                    screenOptions={{
                    headerStyle: { height: 0 }
                }}>
                    <AuthStack.Screen 
                    name="Signup"
                    component={Signup}
                     />
                    <AuthStack.Screen 
                    name="Login"
                    component={Login}
                     />
                </AuthStack.Navigator> */}
            </NavigationContainer>
        </Provider>
    )
}

export default App;
