import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Background = ({ children }) => {
  return (
    <LinearGradient
      colors={['#000000', '#123114', '#09180A']}
      start={{ x: 0, y: -0.01 }}
      end={{ x: 0, y: 1.95 }}
      style={styles.gradient}
    >
      <View style={styles.container}>{children}</View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Background;
