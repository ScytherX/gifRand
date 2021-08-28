import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, Image, Button, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from 'react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import gifs from './gifs'

function HomeScreen() {
  return flat()
}

function SettingsScreen() {
  return flat()
}

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity style={{ alignItems: 'center', alignSelf: 'center' }}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {

  const [gifs, setGifs] = useState([]);
  const [term, updateTerm] = useState('');

  async function rand() {
    const API_KEY = '65jZnv6AH1NT4prsWeg7msk7OYuBhxHO';
    try {
      const Rand_URL = 'http://api.giphy.com/v1/gifs/random';
      const resJson = await fetch(`${Rand_URL}?api_key=${API_KEY}&limit=1`);
      const res = await resJson.json();
      setGifs(res.data);
    } catch (error) {
      console.warn(error);
    }
  }

  async function fetchGifs() {
    const API_KEY = '65jZnv6AH1NT4prsWeg7msk7OYuBhxHO';
    try {
      const BASE_URL = 'http://api.giphy.com/v1/gifs/search';
      const resJson = await fetch(`${BASE_URL}?api_key=${API_KEY}&q=${term}&limit=1`);
      const res = await resJson.json();
      setGifs(res.data);
    } catch (error) {
      console.warn(error);
    }
  }

  function onEdit(newTerm) {
    updateTerm(newTerm);
    fetchGifs();
  }

}

const flat = () => {
  <TextInput
    placeholder="Dogs"
    placeholderTextColor='#fff'
    style={styles.textInput}
    onChangeText={(text) => onEdit(text)}
  />
  return (
    <View style={styles.view}>
      <FlatList style={styles.FlatList}
        data={gifs}
        renderItem={({ item }) => (
          <Image
            resizeMode='contain'
            style={styles.image}
            source={{ uri: item.images.original.url }}
          />
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#CFE2F3'
  },
  textInput: {
    width: '100%',
    borderTopWidth: 50,
    borderEndWidth: 50,
    paddingLeft: 170,
    paddingRight: 30,
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 268,
    zIndex: 125,
    height: 50,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  image: {
    width: 300,
    height: 150,
    padding: 0,
    borderWidth: 0,
    marginTop: 120,
    position: 'relative'
  },
  Button: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 125,
    backgroundColor: 'black',
    paddingBottom: 120
  },
  FlatList: {
    padding: 0,
    margin: 0
  }
});