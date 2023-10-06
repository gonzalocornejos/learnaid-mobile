import {
  Box,
  Text,
  VStack,
  View,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {ImageBackground, Pressable} from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export const backgroundUrl = '../../assets/background.png';

export const textLogoUrl = '../../assets/learn-aid-text-logo.png';

export default function Home() {
  const [dataText, setDataText] = useState(
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molasdasdasdasdasdestia blanditiis consectetur cum aut ipsum placeat labore quam, tempore praesentium perferendis excepturi facilis eligendi nemo officiis nisi fugit omnis debitis esse? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam amet autem sit eaque veniam quas delectus quis laudantium maxime doloremque perspiciatis quasi, suscipit eum, cum a voluptatibus ullam sapiente voluptates.',
  );
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    const fetchData = async () => {};
    fetchData();
  }, []);

  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        {/* Imagen de fondo */}
        <ImageBackground
          source={require('../../assets/background.png')}
          style={{
            width: '100%',
            height: '100%',
          }}>
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
                style={{width: '100%', height: '100%'}}
              />
            </Box>
            <Text
              fontSize={'35px'}
              textAlign={'center'}
              bold
              color={'black'}
              style={{textShadowColor: 'black'}}>
              Tamaño del texto
            </Text>
          </VStack>
        </ImageBackground>
      </View>
    </>
  );
}
