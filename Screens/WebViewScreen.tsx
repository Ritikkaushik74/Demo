import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';
import Header from '../Components/Header';
const WebViewScreen = ({route, navigation}) => {
  const {url, title} = route.params;

  return (
    <View style={styles.container}>
      <Header
        title={title}
        showbackbutton
        onPressBack={() => {
          navigation.goBack();
        }}
      />
      <WebView source={{uri: url}} style={styles.container} />
    </View>
  );
};

export default WebViewScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
});
