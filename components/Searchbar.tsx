import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

export const Searchbar = () => {
  return (
    <View style={styles.searchWrapper}>
      <View style={styles.searchbar}>
        <View style={styles.searchIcon}>
          <TabBarIcon name={'search-outline'} color={'#DCBFBF'} />
          <TextInput
            style={styles.searchPlaceholder}
            placeholder='Search todo...'
          />
        </View>

        <TabBarIcon
          onPress={() => console.log('Pressed')}
          style={styles.filter}
          name={'funnel'}
          color={'#6d77a0'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchWrapper: {
    flexDirection: 'row',
    display: 'flex',
  },
  searchbar: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
  },
  searchIcon: {
    flexDirection: 'row',
    gap: 10,
  },
  searchPlaceholder: {
    color: '#DCBFBF',
  },
  filter: {
    alignSelf: 'flex-end',
    display: 'flex',
  },
});
