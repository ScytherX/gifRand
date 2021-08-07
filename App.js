import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, Image, Button } from 'react-native';

export default function App() {
  const [gifs, setGifs] = useState([]);
  const [term, updateTerm] = useState('');
  const getData = async () => {
    try {
        const data = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${'65jZnv6AH1NT4prsWeg7msk7OYuBhxHO'}`)
        return(data);
    }catch(e){
        console.error(e)
    }
  }

  async function fetchGifs() {
    const API_KEY = '65jZnv6AH1NT4prsWeg7msk7OYuBhxHO';
    try {
      const BASE_URL = 'http://api.giphy.com/v1/gifs/search';
      const resJson = await fetch(`${BASE_URL}?api_key=${API_KEY}&q=${term}`);
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
  return (
    <View style={styles.view}>
      <TextInput
        placeholder="Search Giphy"
        placeholderTextColor='#fff'
        style={styles.textInput}
        onChangeText={(text) => onEdit(text)}
      />

      <Button title="Random Gif"  onPress={ getData }/>

      <FlatList
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
    backgroundColor: 'black'
  },
  textInput: {
    width: '100%',
    height: 50,
    color: 'white'
  },
  image: {
    width: 300,
    height: 150,
    borderWidth: 3,
    marginBottom: 5
  },
});