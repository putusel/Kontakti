import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Dimensions } from 'react-native';
import * as Contacts from'expo-contacts';

export default function App() {
  const [currentContact, setCurrentContact] = useState({});

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      })

      if (data.length > 0) {
        setCurrentContact(data);
        console.log(data[0]);
      }
    }
  }

  return (
    <View style={styles.container}>
      <FlatList style={styles.list}
          data={currentContact}
          renderItem={({ item }) =>
        <View>
          <Text> {item.name}, {item.phoneNumbers[0].number} </Text>
        </View>
          }
        />
      <View style={{ width:Dimensions.get("window").width * 0.9, flexDirection: 'row', justifyContent: 'center', marginBottom: 10}}>
        <Button title="Get contacts" onPress={getContacts} />
      </View>
        
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  
  
});
