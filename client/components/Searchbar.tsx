import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import React, { useRef } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

export const Searchbar = ({ todos, setTodos }) => {
  const searchRef = useRef(null);
  const filterSearch = (val) => {
    let filtered = todos.filter(({ title }) =>
      title.toLowerCase().includes(val.toLowerCase())
    );

    setTodos(filtered);
  };

  return (
    <Pressable
      onPress={() => searchRef?.current.focus()}
      style={styles.searchWrapper}
    >
      <View style={styles.searchbar}>
        <View style={styles.searchIcon}>
          <TabBarIcon
            onPress={() => searchRef?.current.focus()}
            name={'search-outline'}
            color={'#DCBFBF'}
          />
          <TextInput
            ref={searchRef}
            onChangeText={(val) => filterSearch(val)}
            style={styles.searchPlaceholder}
            placeholder='Search todo...'
          />
        </View>
      </View>
    </Pressable>
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
    color: '#8b8383',
  },
  filter: {
    alignSelf: 'flex-end',
    display: 'flex',
  },
});
