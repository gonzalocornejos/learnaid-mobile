import { extendTheme } from 'native-base';
import { StyleSheet } from 'react-native';


export const palette = {
    yellow: '#F5C249',
    red: '#FF403B',
    green: '#00C566',
    black: '#16171D',
    blackLight: '#21242D',
    grey: '#494D58',
    white: '#F0F2F3',
};

export const nativeBaseTheme = extendTheme({
    colors: {
        singletons: {
            white: 'F0F2F3',
            black: '16171D',
        },
        primary: {
            50: '#fff5dc',
            100: '#ffe9b5',
            200: '#fddc8f',
            300: '#f7ce6d',
            400: '#f5c249',
            500: '#eeb737',
            600: '#e5ac29',
            700: '#d39e22',
            800: '#b88c26',
            900: '#9f7b28',
        },
        danger: {
            50: '#ffdddc',
            100: '#ffb7b5',
            200: '#ff918d',
            300: '#ff6a65',
            400: '#ff403b',
            500: '#f8332c',
            600: '#f1241d',
            700: '#df1d16',
            800: '#c3201b',
            900: '#a9221e',
        },
        success: {
            50: '#67ffb6',
            100: '#3fffa2',
            200: '#17ff8f',
            300: '#00ef7b',
            400: '#00c566',
            500: '#05aa5a',
            600: '#098f4e',
            700: '#0c7542',
            800: '#0d5c36',
            900: '#0c452a',
        },
    },
    fonts: {
        heading: 'Poppins-SemiBold',
        body: 'Poppins-Medium',
    },
    config: {
        useSystemColorMode: false,
        initialColorMode: 'dark',
    },
});

export const reactNavigationTheme = {
    // COLORS
    dark: true,
    colors: {
        primary: palette.yellow,
        background: palette.black,
        card: palette.black,
        text: palette.white,
        border: palette.black,
        notification: palette.black,
        foreground: palette.white,
        success: palette.yellow,
        danger: palette.red,
        failure: palette.red,
    },
    spacing: {
        s: 8,
        m: 16,
        l: 24,
        xl: 40,
    },
};

export const styles = StyleSheet.create({
    buttonGroup: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
    },
    button: {
      borderRadius: 25,
      padding: 10,
      backgroundColor: '#D9D9D9',
    },
    largeButton: {
      padding: 15,
    },
  });