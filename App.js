import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { Store } from './src/redux/store';

import Tabs from "./src/components/TabNavigatorComponent";

const Stack = createStackNavigator();

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
                </NavigationContainer>
        </Provider>
    )
}

export default App;
