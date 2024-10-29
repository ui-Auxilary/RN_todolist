import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { TabBarIcon } from './navigation/TabBarIcon';

const Header = ({
  heading,
  navigation,
  hideCreate = false,
}: {
  heading: String;
  navigation: any;
  hideCreate: boolean;
}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{heading}</Text>
      {hideCreate ? null : (
        <TabBarIcon
          onPress={() => navigation.navigate('create')}
          size={50}
          name={'add-circle'}
          color={'#FFFFFF'}
        />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3B63FF',
    paddingHorizontal: 25,
    paddingTop: 50,
    paddingBottom: 20,
    height: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
});
