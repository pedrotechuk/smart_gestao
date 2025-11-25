import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function Splash() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={{ width: 200, height: 200 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#fff' }
});
