import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { io } from 'socket.io-client';

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
        <View style={{ flex: 1 }}>
          {!scanning ? (
            <View>
              <Text>Press the button to scan QR</Text>
              <Button title="Scan QR" onPress={() => {
                setScanning(true);
                setScanned(false);
              }} />
            </View>
          ) : (
            <CameraView
              style={{ flex: 1}}
              facing="back"
              onBarcodeScanned={scanned ? undefined : handleQRScanned}
              barcodeScannerSettings={{
                barcodeTypes: ["qr"],
              }}
            />
          )}
          {scanning ? (
            <TouchableOpacity
              onPress={() => {
                setScanning(false)
              }}
              >
                <Text>Go back</Text>
              </TouchableOpacity>) : undefined
          }
            <Text>Room Id</Text>
            <TextInput
              placeholder="Enter Room Id"
              value={manualRoomId}
              onChangeText={setManualRoomId}
              />
            <Button title="Find room" onPress={() => handleRoomId(manualRoomId)} />
            {error && <Text>{error}</Text>}
        </View>
      );
}
