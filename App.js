// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/

import 'react-native-gesture-handler';
import { Search } from "./Search"
import Spinner from './Spinner';
import { MovieInfo } from './MovieInfo';
import * as React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainContainer, { Main } from './Main';
import AppIntro from './AppIntro';
import { Settings } from './Settings';
import PlatformsContainer from './Platforms';
import GenresContainer from './Genres';
import Metacritic from './MetacriticPlatform';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
function HomeStack() {
  const [language, setLanguage] = React.useState("")
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
        <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ title: 'Settings Page' }}
      />
        <Stack.Screen name="AppIntro" component={AppIntro} />
      <Stack.Screen name="Main" component={MainContainer} options={{
        title: "Popular now"
      }} />
      <Stack.Screen name="Platforms" component={PlatformsContainer} options={{
        title: "Platform"
      }} />
       <Stack.Screen name="Metacritic" component={Metacritic} options={{
        title: "Metacritic platforms",
        headerBackTitle: null
      }} />
      <Stack.Screen name="Genre" component={GenresContainer} options={{
        title: "Genre"
      }} />
      <Stack.Screen name="Spinner" component={Spinner}/>
      <Stack.Screen name="MovieInfo" component={MovieInfo} options={{
        headerBackTitleVisible: false,
        headerLeft: null,
        headerTintColor: "#fff"

      }} />
      <Stack.Screen name="Search" component={Search} options={{
        title: "Search"
      }} />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ title: 'Search' }}
      />
      <Stack.Screen name="MovieInfo" component={MovieInfo} options={{
        headerBackTitleVisible: false,
        headerLeft: null,
        headerTintColor: "#fff"

      }} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Main"
        tabBarOptions={{
          activeTintColor: '#20BEF1',
        }}>
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SettingsStack}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="movie-search-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
