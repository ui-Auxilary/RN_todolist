import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const Header = ({ heading }: { heading: String }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{heading}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3B63FF',
    paddingHorizontal: 25,
    paddingTop: 50,
    paddingBottom: 30,
    height: 120,
  },
  headerTitle: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
});
