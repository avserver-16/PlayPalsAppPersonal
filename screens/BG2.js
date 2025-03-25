import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const BG2 = ({ children }) => {
    return (<ImageBackground
        source={require('./asset/BG2.png')}
        style={styles.imageBackground}
        resizeMode="cover"
    >
        <LinearGradient
            colors={[ 'rgba(31, 31, 31, 0.8) 0%,', 'rgba(0, 0, 0, 1) 100%']}
            start={{ x: 0, y: -0.01 }}
            end={{ x: 0, y: 1.95 }}
            style={styles.gradient}
        >
            <View style={styles.container}>
                {children}
            </View>
        </LinearGradient>
    </ImageBackground>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        zIndex: 3
    },
    imageBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default BG2;

