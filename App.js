import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, listSeparator } from 'react-native';
import * as Contacts from'expo-contacts';

export default function App() {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      })

      if (data.length > 0) {
        setContacts([...data, { key: text }]);
        console.log(data[0]);
      }
    }
  }

  return (
    <View style={styles.container}>
      <FlatList style={styles.list}
          data={contacts}
          renderItem={({ item }) =>
        <View> 
          <Text 
            style={{fontSize:16, fontWeight: "bold"}}>{item.firstName}
          </Text>
          <Text 
          style={{fontSize:16, fontWeight: "bold"}}>{item.lastName}
          </Text>
          <Text 
          style={{fontSize:16, fontWeight: "bold"}}>{item.phonenumbers.number}
          </Text>
        </View>
        }/>
      <View style={styles.container} >
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
  },
});