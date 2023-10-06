import {
  Box,
  Button,
  Card,
  Center,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
  View,
} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  ImageBackground,
  Modal,
} from 'react-native';
import {Camera, CameraType, FlashMode} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import {StyleSheet} from 'react-native';
import axios from 'axios';
import ky, { KyResponse } from 'ky';
import { Audio } from 'expo-av';

export const backgroundUrl = '../../assets/background.png';

export const textLogoUrl = '../../assets/learn-aid-text-logo.png';

export const cameraIconUrl = '../../assets/cameraIcon.png';

export const settingsIconUrl = '../../assets/settingsIcon.png';

export const addIconUrl = '../../assets/addIcon.png';

export const forwardIconUrl = '../../assets/forwardIcon.png';

export const backwardIconUrl = '../../assets/backwardIcon.png';

export default function Home() {
  const [dataText, setDataText] = useState("");
  const [audio, setAudio] = useState<any | null>();
  const [sound, setSound] = useState<any | null>();
  const [tamañoTexto, setTamañoTexto] = useState(25);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);

  const [cameraOpen, setCameraOpen] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [image, setImage] = useState<any | null>();
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  const [play, setPlay] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {};
    fetchData();

    const getPermissions = async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    };
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log('DATA: ', data);
        setImage(data);
      } catch (e) {
        console.log('Exception error: ', e);
      }
    }
  };

  const handleSendText = async (text: any) =>{
          const response = await ky.get(`https://rzpxn389-5261.brs.devtunnels.ms/api/v1/Mobile/generar-audio/${text}`)
          .then((response: KyResponse) => {
            response.blob() 
            .then((blob: Blob) => {   
              console.log(blob);        
              setAudio(blob);
              console.log(audio);
            })
          })
          .catch((err) => {
            console.log(err);
          })
};
          

  const handleSendImage = async (image: any) => {
    const formData = new FormData();
    formData.append('Imagen', {
      uri: image.uri,
      name: 'imagen.jpg',
      type: 'image/jpeg', // Cambiado a 'jpeg' según la extensión típica de una imagen
    });
    try {
      var response = axios
        .postForm(
          'https://rzpxn389-5261.brs.devtunnels.ms/api/v1/Mobile/generar-texto',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        .then(response => {
          console.log('RESPUESTA IMAGEN: ', response.data);
          setDataText(response.data);
          handleSendText(response.data);
        })
        .catch(err => {
          console.log('CATCH ERROR: ', err);
        });
      //const response = await ky.post('https://localhost:7261/api/v1/Usuarios/crear-usuario', {
      //    headers: {"Content-Type": "multipart/form-data"},
      //    body: formData
      //});

      //console.log('RESPUESTA: ', response);
      // Manejar la respuesta del POST
    } catch (error) {
      console.log('ERROR AL PROCESAR LA IMAGEN:', error);
    }
  };

  /* if (hasCameraPermission === false) {
    return <Text>No tienes acceso a la cámara con esta aplicación</Text>;
  }*/
  const getPermissions = async () => {
    MediaLibrary.requestPermissionsAsync();
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(cameraStatus.status === 'granted');
  };

  const handleCameraOpen = async () => {
    if (!hasCameraPermission) {
      await getPermissions();
    }
    setCameraOpen(true);
  }

  const createFile = (file: any) => {
    new File(file, "audio.mp3")
  }

  const handleReproducir = async () => {
      console.log('entro1');
      if(audio){
        try{
          createFile(audio);
          var sound = new Audio.Sound();
          console.log('Loading Sound');
          await sound.loadAsync(require('./audio.mp3'));
          setSound(sound);

          console.log('Playing Sound');
          await sound.playAsync();
        } catch (e) {
          console.log('Error', e)
        }
      }
  }

  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        {/* Imagen de fondo */}
        <ImageBackground
          source={require('../../assets/background.png')}
          style={{
            width: '100%',
            height: '100%',
          }}
          alt="icon.png">
          <VStack
            style={{
              flex: 1,
              padding: 10,
              paddingLeft: '5%',
            }}
            space={5}>
            <ScrollView
              contentContainerStyle={{flexGrow: 1}}
              showsVerticalScrollIndicator={false}>
              <Card
                style={{
                  borderRadius: 0,
                  height: '100%',
                }}>
                <Text
                  fontSize={tamañoTexto + 'px'}
                  textAlign={'justify'}
                  bold
                  color={'black'}
                  style={{textShadowColor: 'black'}}
                  p={5}>
                  {dataText}
                </Text>
              </Card>
            </ScrollView>
            <HStack
              justifyContent={'center'}
              space={'10%'}
              height={'20%'}
              p={'5%'}
              paddingBottom={'10%'}>
              <Button
                width={'30%'}
                height={'100%'}
                style={{
                  bottom: '-15%',
                  right: '-2.5%',
                  backgroundColor: 'orange',
                }}
                onPress={() => {
                  setSettingsModalVisible(true);
                }}>
                <Center>
                  <Image
                    source={require('../../assets/settingsIcon.png')}
                    style={{
                      width: '100%',
                      height: '65%',
                    }}
                    alt="icon.png"
                  />
                  <Text color={'black'}>Ajustes</Text>
                </Center>
              </Button>
              <Button
                width={'30%'}
                height={'100%'}
                style={{backgroundColor: 'lightblue'}}
                onPress={() => handleCameraOpen()}>
                <Center>
                  <Image
                    source={require('../../assets/cameraIcon.png')}
                    style={{
                      width: '100%',
                      height: '63%',
                    }}
                    alt="icon.png"
                  />
                  <Text color={'black'} fontSize={15}>
                    Cámara
                  </Text>
                </Center>
              </Button>
              <Button
                width={'30%'}
                height={'100%'}
                style={{
                  bottom: '-15%',
                  left: '-2.5%',
                  backgroundColor: 'orange',
                }}
                shadow={20}>
                <Center>
                  <Image
                    source={require('../../assets/addIcon.png')}
                    style={{
                      width: '80%',
                      height: '60%',
                    }}
                    alt="icon.png"
                  />
                  <Text color={'black'} fontSize={'15px'}>
                    Agregar
                  </Text>
                </Center>
              </Button>
            </HStack>
            <HStack space={5}>
              <Button
                width={'30%'}
                height={'100%'}
                background={'white'}
                onPress={() => {
                  ('');
                }}>
                <Center>
                  <Text color={'black'} fontSize={17}>
                    Atrasar
                  </Text>
                </Center>
              </Button>
              <Button
                width={'30%'}
                height={'100%'}
                background={'black'}
                onPress={() => handleReproducir()}>
                <Center>
                  <Text color={'white'} fontSize={17}>
                    {!play ? 'Reproducir' : 'Pausar'}
                  </Text>
                </Center>
              </Button>
              <Button
                width={'30%'}
                height={'100%'}
                background={'white'}
                onPress={() => {}}>
                <Center>
                  <Text color={'black'} fontSize={17}>
                    Adelantar
                  </Text>
                </Center>
              </Button>
            </HStack>
          </VStack>
        </ImageBackground>
      </View>
      {/*MODAL SETTINGS*/}
      <Modal visible={settingsModalVisible}>
        <View style={{flex: 1}}>
          <ImageBackground
            source={require('../../assets/background.png')}
            style={{
              width: '100%',
              height: '100%',
            }}
            alt="icon.png">
            <VStack
              style={{
                flex: 1,
                padding: 10,
                paddingLeft: '5%',
              }}
              space={5}>
              <Box
                style={{
                  width: '100%',
                  height: '10%',
                }}>
                <ImageBackground
                  source={require('../../assets/learn-aid-text-logo.png')}
                  style={{width: '50%', height: '50%'}}
                  alt="icon.png"
                />
              </Box>
              <Button
                width={'30%'}
                size={10}
                background={'black'}
                onPress={() => {
                  setSettingsModalVisible(!settingsModalVisible);
                }}
                justifyContent={'center'}
                alignItems={'center'}>
                <Center>
                  <Text fontSize={'25px'} bold color={'white'}>
                    Cerrar
                  </Text>
                </Center>
              </Button>
              <Text fontSize={'25px'} textAlign={'center'} bold color={'black'}>
                Tamaño del texto
              </Text>
              <HStack>
                <Button
                  width={'30%'}
                  height={'100%'}
                  background={'black'}
                  onPress={() => {
                    tamañoTexto >= 25
                      ? setTamañoTexto(tamañoTexto - 1)
                      : Alert.alert('la letra no puede achicarse mas');
                  }}>
                  <Center>
                    <Text color={'white'} fontSize={19}>
                      Achicar
                    </Text>
                  </Center>
                </Button>
                <Box
                  style={{
                    width: '40%',
                    height: '100%',
                    backgroundColor: 'white',
                  }}>
                  <Text
                    fontSize={tamañoTexto + 'px'}
                    textAlign={'center'}
                    bold
                    color={'black'}>
                    A
                  </Text>
                </Box>
                <Button
                  width={'30%'}
                  height={'100%'}
                  background={'black'}
                  onPress={() => {
                    tamañoTexto <= 45
                      ? setTamañoTexto(tamañoTexto + 1)
                      : Alert.alert('la letra no puede aumentarse mas');
                  }}>
                  <Center>
                    <Text
                      color={'white'}
                      fontFamily={'notoserif'}
                      fontSize={19}>
                      Aumentar
                    </Text>
                  </Center>
                </Button>
              </HStack>
              <Text fontSize={'25px'} textAlign={'center'} bold color={'black'}>
                Velocidad de reproducción
              </Text>
              <HStack>
                <Button
                  width={'30%'}
                  height={'100%'}
                  background={'black'}
                  onPress={() => {
                    tamañoTexto >= 25
                      ? setTamañoTexto(tamañoTexto - 1)
                      : Alert.alert('la letra no puede achicarse mas');
                  }}>
                  <Center>
                    <Text color={'white'} fontSize={19}>
                      Achicar
                    </Text>
                  </Center>
                </Button>
                <Box
                  style={{
                    width: '40%',
                    height: '100%',
                    backgroundColor: 'white',
                  }}>
                  <Text
                    fontSize={tamañoTexto + 'px'}
                    textAlign={'center'}
                    bold
                    color={'black'}>
                    A
                  </Text>
                </Box>
                <Button
                  width={'30%'}
                  height={'100%'}
                  background={'black'}
                  onPress={() => {
                    tamañoTexto <= 45
                      ? setTamañoTexto(tamañoTexto + 1)
                      : Alert.alert('la letra no puede aumentarse mas');
                  }}>
                  <Center>
                    <Text
                      color={'white'}
                      fontFamily={'notoserif'}
                      fontSize={19}>
                      Aumentar
                    </Text>
                  </Center>
                </Button>
              </HStack>
            </VStack>
          </ImageBackground>
        </View>
      </Modal>
      {/*MODAL CAMARA*/}
      
      <Modal visible={cameraOpen}>
        <VStack style={{flex: 1}}>
          {!image ? (
            <Camera
              style={styles.camera}
              type={type}
              flashMode={flash}
              ref={cameraRef}></Camera>
          ) : (
            <Image
              source={{uri: image.uri}}
              style={styles.camera}
              alt="image.jpg"
            />
          )}

          {image ? (
            <HStack height={'10%'}>
              <Button
                height={'100%'}
                width={'50%'}
                onPress={() => setImage(null)}
                style={{backgroundColor: 'red'}}>
                TOMAR DE NUEVO
              </Button>
              <Button
                height={'100%'}
                width={'50%'}
                onPress={() => {
                  handleSendImage(image);
                  setCameraOpen(!cameraOpen);
                }}
                style={{backgroundColor: 'green'}}>
                CONSERVAR
              </Button>
            </HStack>
          ) : (
            <Button
              height={'10%'}
              width={'100%'}
              onPress={takePicture}
              backgroundColor={'black'}>
              !TOCA PARA CAPTURAR!
            </Button>
          )}
        </VStack>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    background: '#fff',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    borderRadius: 5,
  },
});
