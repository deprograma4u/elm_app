import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

// Screen Comps
import Signup from './screens/Signup';
import Profile from './screens/Profile';
import HomTabs from './screens/HomTabs';
import Login from './screens/Login';
import PostListing from './screens/PostListing';
import PostView from './screens/PostView';
import LaborView from './screens/LaborView';
import Materials from './screens/Materials';
import Equipements from './screens/Equipements';
import Laborrers from './screens/Laborrers';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='HomeTabs' component={HomTabs} options={{headerShown: false}} />
        <Stack.Screen name='postlisting' component={PostListing} options={{headerShown: false}} />
        <Stack.Screen name='signup' component={Signup} options={{headerShown: false}} />
        <Stack.Screen name='login' component={Login} options={{headerShown: false}} />
        <Stack.Screen name='postView' component={PostView} options={{headerShown: false}} />
        <Stack.Screen name='LaborView' component={LaborView} options={{headerShown: false}} />
        <Stack.Screen name='profile' component={Profile} options={{headerShown: false}} />
        <Stack.Screen name='materials' component={Materials} options={{headerShown: false}} />
        <Stack.Screen name='equipments' component={Equipements} options={{headerShown: false}} />
        <Stack.Screen name='laborrers' component={Laborrers} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

