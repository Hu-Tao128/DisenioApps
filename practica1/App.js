import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Image, FlatList } from 'react-native';
import React, { useState } from 'react';

export default function App() {

  const [id, setCount] = useState(1);
  const increase = () => {
    setCount(id + 1);
  };
  
  const [datos, setDatos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleAddUser = async () => {
    try {
      if (!nombre.trim() || !email.trim() || !phone.trim()) {
        alert("Todos los campos son obligatorios.");
        return; 
        // detener la ejecución si algún campo está vacío
      }
      
      increase();
      setDatos((prevDatos) => [
        ...prevDatos,
        { id: id, nombre: nombre.trim(), email: email.trim(), phone: phone.trim() }
      ]);
      alert("Usuario agregado exitosamente");
  
      setNombre('');
      setEmail('');
      setPhone('');
    } catch (error) {
      alert("Error al agregar usuario: " + error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Image style={styles.image}
        source={require('./assets/nfl.jpg')}/>
      <Text style={styles.title}>Registrar Usuario</Text>
      <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
      />
      <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
      />
      <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="numeric"
      />
      <Button title="Registrar Usuario" onPress={handleAddUser} />
        {datos.length > 0 ? (
          <FlatList
          //mostrar los datos en un a flatlist
              data={datos}
              //data usa los datos para crear una lisra
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                //muestra cada documento o registro con sus valores correspondientesa
                  <View style={styles.item}>
                      <Text>ID: {item.id}</Text>
                      <Text>Nombre: {item.nombre}</Text>
                      <Text>Email: {item.email}</Text>
                      <Text>Phone: {item.phone}</Text>
                  </View>
              )}
            />
          ) : (
            <Text>No hay datos disponibles</Text>
          )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    paddingTop: 5,
  },
  title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
  },
  input: {
      width: '80%',
      padding: 10,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
  },
  item: {
      backgroundColor: '#f9f9f9',
      padding: 10,
      marginVertical: 5,
      borderRadius: 5,
      width: '100%',
      alignItems: 'center',
  },
});

//fuentes para usar flatlist y arrays:
/*
arrays: https://es.react.dev/learn/updating-arrays-in-state
FlatList: https://imaginaformacion.com/tutoriales/como-usar-flatlist-en-react-native
*/