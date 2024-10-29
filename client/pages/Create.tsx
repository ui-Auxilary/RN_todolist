import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import { BASE_URL } from '@/constants/api';
import { useTodoData } from '@/hooks/TodoContext';
import { fetchTags } from '@/hooks/api';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const Create = ({ navigation }: { navigation: any }) => {
  const [important, setImportant] = useState(false);
  const [todoData, setTodoData] = useState({
    title: '',
    description: '',
    photo: '',
    tags: '',
    important: false,
    completed: false,
  });

  const { tags, setTags } = useTodoData();

  const handleCreate = () => {
    // Handle errors
    let { title, description, tags } = todoData;

    // Format tags
    let splitTag = todoData.tags.split(',').filter((tag) => tag);

    if (!title || (title && !description)) {
      Alert.alert('Cannot be empty', 'You must have a title and description!', [
        {
          text: 'Ok',
          style: 'default',
        },
      ]);
      return;
    }

    if (splitTag.length > 3) {
      Alert.alert('Invalid tag length', 'Can only have up to 3 tags!', [
        {
          text: 'Ok',
          style: 'default',
        },
      ]);
      return;
    }

    let tagsFormatted = [];
    for (let tag of splitTag) {
      tagsFormatted.push({
        where: {
          name: tag,
        },
        create: {
          name: tag,
        },
      });
    }

    let createData = {
      ...todoData,
      tags: { connectOrCreate: tagsFormatted },
    };

    let res = axios
      .post(`${BASE_URL}/todos/new`, createData)
      .then(() => {
        fetchTags()
          .then(({ data }) => {
            setTags(data.data);
          })
          .catch((e) => console.log(e));
        navigation.navigate({ name: 'todo', params: { newTodo: true } });
      })
      .catch((e) => console.log(e));
  };

  const updateImportant = () => {
    let { important } = todoData;

    setTodoData({ ...todoData, important: !important });
    setImportant(!important);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
    });

    if (result) {
      setTodoData({
        ...todoData,
        photo: result.assets ? result.assets[0].uri : '',
      });
    }
  };

  return (
    <>
      <View style={styles.headerWrapper}>
        <TabBarIcon
          onPress={() => navigation.goBack()}
          size={35}
          name={'arrow-back'}
          color={'#FFFFFF'}
        />

        <Text style={styles.headerTitle}>Create todo 📝</Text>
      </View>

      <ScrollView style={styles.createContainer}>
        <View style={styles.createWrapper}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputTitle}>Title</Text>
            <TextInput
              onChangeText={(val) => setTodoData({ ...todoData, title: val })}
              style={styles.titleField}
              value={todoData.title}
              placeholder='Enter title'
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputTitle}>Description</Text>
            <TextInput
              onChangeText={(val) =>
                setTodoData({ ...todoData, description: val })
              }
              multiline={true}
              value={todoData.description}
              style={styles.titleDescription}
              placeholder='Add a description...'
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputTitle}>Task cover photo</Text>
            <View style={styles.photoContainer}>
              {todoData.photo ? (
                <Image
                  style={styles.coverPhoto}
                  source={{ uri: todoData.photo }}
                />
              ) : null}
              <View style={styles.pickImage}>
                <TouchableOpacity onPress={pickImage}>
                  <Text style={styles.pickImageText}>Pick an image</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputTitle}>
              {'Tags (comma separated up to 3)'}
            </Text>
            <TextInput
              onChangeText={(val) => setTodoData({ ...todoData, tags: val })}
              value={todoData.tags}
              style={styles.titleField}
              placeholder='Tags'
            />
          </View>
          <View style={styles.footer}>
            <View style={styles.footerWrapper}>
              <TabBarIcon
                onPress={updateImportant}
                size={35}
                name={important ? 'checkbox' : 'square-outline'}
                color={'#3B63FF'}
              />
              <Text style={styles.importantText}>Important</Text>
            </View>
            <TouchableOpacity
              onPress={handleCreate}
              style={styles.createButton}
            >
              <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Create;

const styles = StyleSheet.create({
  safeView: { flex: 1 },
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
  },
  createWrapper: {
    flexDirection: 'column',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    flex: 1,
    gap: 10,
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
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  createButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 5,
    backgroundColor: '#3B63FF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  importantText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#3B63FF',
  },
  photoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4E7E7',
    borderRadius: 5,
    height: 140,
    position: 'relative',
  },
  pickImage: {
    zIndex: 1,
    position: 'absolute',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickImageText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: 'rgba(59, 98, 255, 0.9)',
    padding: 10,
    borderRadius: 10,
  },
  coverPhoto: {
    height: 140,
    width: '100%',
    borderRadius: 5,
  },
});
