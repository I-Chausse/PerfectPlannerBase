import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const Popup = ({ visible, message, isSuccess }) => {
  const fadeAnim = new Animated.Value(0);
  console.log('Popup rendered');

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          // Inform the parent that the popup has disappeared
        });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <Animated.View style={[styles.popup, { opacity: fadeAnim }, isSuccess ? styles.success : styles.error]}>
      <Text style={styles.popupText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  popup: {
    position: 'absolute',
    top: 50,
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    zIndex: 1,
  },
  popupText: {
    color: '#fff',
    fontSize: 16,
  },
  success: {
    backgroundColor: 'green',
  },
  error: {
    backgroundColor: 'red',
  },
});

export default Popup;
