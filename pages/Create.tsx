import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { Searchbar } from '@/components/Searchbar';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import Header from '@/components/Header';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

const Create = ({ navigation }: { navigation: any }) => {
  return (
    <>
      <View style={styles.headerWrapper}>
        <TabBarIcon
          onPress={() => navigation.goBack()}
          size={35}
          name={'arrow-back'}
          color={'#FFFFFF'}
        />

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Create todo 📝</Text>
        </View>
      </View>
      <View style={styles.createContainer}>
        <View style={styles.createWrapper}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputTitle}>Title</Text>
            <TextInput style={styles.titleField} placeholder='Enter title' />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputTitle}>Description</Text>
            <TextInput
              multiline={true}
              style={styles.titleDescription}
              placeholder='Add a description...'
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputTitle}>Task cover photo</Text>
            <TextInput style={styles.titleField} placeholder='Enter title' />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputTitle}>Tags</Text>
            <TextInput style={styles.titleField} placeholder='Tags' />
          </View>
          <View>
            <View></View>
            <TouchableOpacity>
              <Text>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default Create;

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#3B63FF',
    paddingHorizontal: 25,
    paddingTop: 50,
    paddingBottom: 30,
    alignItems: 'center',
    height: 120,
  },
  header: {},
  headerTitle: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  inputGroup: {
    flexDirection: 'column',
    gap: 10,
  },
  createContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  createWrapper: {
    flexDirection: 'column',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    flex: 1,
    gap: 20,
  },
  inputTitle: {
    fontSize: 16,
    color: '#3B63FF',
    fontWeight: 'bold',
  },
  titleField: {
    backgroundColor: '#F4E7E7',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  titleDescription: {
    backgroundColor: '#F4E7E7',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    height: 100,
    textAlignVertical: 'top',
  },
});
