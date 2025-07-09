import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { io } from 'socket.io-client';
import Heading from "../components/heading";

const socket = io("http://192.168.1.52:3000");

export default function JoinSession({ navigation }) {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanning, setScanning] = useState(false);
    const [scanned, setScanned] = useState(false);
    const [manualRoomId, setManualRoomId] = useState('');
    const [error, setError] = useState('');


    const handleQRScanned = ({ data }) => {
        setScanned(true);
        setScanning(false);
        navigation.navigate('GameScreen', {roomId: data})
    };

    const handleRoomId = (id) => {
      if (!id || id.trim() === '') {
        setError('Room Id is required');
        return;
      }
      setError('');
      
      socket.emit('check-room-exists', id, (response) => {
        if (response.exists){
          navigation.navigate('GameScreen', { roomId: id });
        } else {
          setError('Room not found.  Please try again');
        }
      });
    };


    if (permission === null) {
        return (
          <View>
            <Text>Requesting camera permission...</Text>
          </View>
        );
      }
    
      if (permission === false) {
        return (
          <View style={styles.center}>
            <Text>No access to camera</Text>
            <Button title="Grant Permission" onPress={requestPermission} />
          </View>
        );
      }
    

      return (
        <SafeAreaView style = {{ flex: 1, backgroundColor: '#34b4eb' }}>
          <Heading title="Join Session" />
          {scanning ? (
            <View style={{ flex: 1 }}>
              <CameraView
                style={{ flex: 1}}
                facing="back"
                onBarcodeScanned={scanned ? undefined : handleQRScanned}
                barcodeScannerSettings={{
                  barcodeTypes: ["qr"],
                }}
              />
              <TouchableOpacity style={page.button}
                onPress={() => 
                  setScanning(false)
                }
                >
                <Text style={page.buttonText}>Go back</Text>
              </TouchableOpacity>            
            </View>
          ) : ( 
            <View>
              <Text style={page.text}>Press the button to scan QR</Text>
              <TouchableOpacity style={page.button}
                onPress={() => {
                setScanning(true);
                setScanned(false);
              }}
              >
                <Text style={page.buttonText}>Scan QR</Text>
              </TouchableOpacity>
              <View>
                <Text style={page.text}>Search by Room Id</Text>
                <TextInput style={page.text}
                  placeholder="Enter Room Id"
                  value={manualRoomId}
                  onChangeText={setManualRoomId}
                />
                <TouchableOpacity style={page.button}
                  onPress={() =>
                    handleRoomId(manualRoomId)
                  }
                >
                <Text style={page.buttonText}>Find Room</Text>
                </TouchableOpacity>
                {error && <Text>{error}</Text>}
              </View>
            </View>
          )}
        </SafeAreaView>
      );
}

const page = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        alignItems: 'center',
        backgroundColor: '#34b4eb',
        justifyContent: 'space-between',
    },
  
    text: {
        color: '#eaeaea',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center',
        alignSelf: 'flex-end'
    
    },
  
    buttonContainer: {
        marginTop: 80,
        marginBottom: 100,
        width: '100%',
        paddingHorizontal: 40,
        alignSelf: 'flex-end',
    },
  
    button: {
        backgroundColor: '#ebab34',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 100,
    },
  
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
  });

