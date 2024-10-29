import { BASE_URL } from '@/constants/api';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import { TextInput } from 'react-native-gesture-handler';
import { TabBarIcon } from './navigation/TabBarIcon';

import { useTodoData } from '@/hooks/TodoContext';
import { fetchTags } from '@/hooks/api';
import * as ImagePicker from 'expo-image-picker';

const EditTodo = ({ payload }: SheetProps<'view-sheet'>) => {
  const { tags, setTags, todos, setTodos } = useTodoData();
  const [todoTags, setTodoTags] = useState([]);

  const [edit, setEdit] = useState({
    title: payload?.title,
    description: payload?.description,
    photo: payload?.photo,
    tags: {},
    important: payload?.important,
  });
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const handleEdit = () => {
    let newEdit = edit;
    let updateTags = [];
    let newTags = (todoTags[0] as string).split(',');

    for (let tag of newTags) {
      let tagTrim = tag.trim();
      updateTags.push({
        where: {
          name: tagTrim,
        },
        create: {
          name: tagTrim,
        },
      });
    }

    newEdit['tags'] = {
      connectOrCreate: updateTags,
    };

    axios
      .put(`${BASE_URL}/todos/edit/${payload?.id}`, newEdit)
      .then(({ data }) => {
        fetchTags()
          .then(({ data }) => {
            setTags(data.data);
          })
          .catch((e) => console.log(e));
        let newTodos = todos.filter((todo) => todo.id != payload?.id);
        newTodos.push(data.data);
        setTodos(
          newTodos.sort((a, b) => -a.createdAt.localeCompare(b.createdAt))
        );
        SheetManager.hide('view-sheet');
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (payload?.tagIDs)
      for (let tagID of payload?.tagIDs) {
        let tag = tags.find((tag) => tag.id === tagID) || {};
        let editTags = edit['tags'] || {};

        setTodoTags((prev) => [...prev, tag.name]);

        setEdit({ ...edit, tags: { ...editTags, ...tag } });
      }
  }, [payload?.tagIDs]);

  const handleDelete = async () => {
    Alert.alert(
      'Delete todo',
      'Are you sure you want to delete?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            axios
              .delete(`${BASE_URL}/todos/delete/${payload?.id}`)
              .then(() => {
                let newTodos = todos.filter((todo) => todo.id != payload?.id);
                setTodos(newTodos);
                SheetManager.hide('view-sheet');
              })
              .catch((e) => console.log(e));
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
    });

    if (result) {
      setEdit({
        ...edit,
        photo: result.assets ? result.assets[0].uri : '',
      });
    }
  };

  return (
    <ActionSheet ref={actionSheetRef}>
      <View style={styles.createContainer}>
        <View style={styles.editRow}>
          <Pressable
            style={styles.editRow}
            onPress={() => SheetManager.hide('edit-sheet')}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
          <Pressable style={styles.editRow} onPress={handleDelete}>
            <Text style={styles.deleteText}>Delete {payload?.title}</Text>
            <TabBarIcon size={20} name={'trash'} color={'#FF3B79'} />
          </Pressable>
        </View>
        <View style={styles.photoContainer}>
          {edit?.photo ? (
            <Image style={styles.coverPhoto} source={{ uri: edit?.photo }} />
          ) : (
            <Image
              style={styles.coverPhoto}
              src={
                'https://img.freepik.com/free-photo/blue-gradient-abstract-background-empty-room-with-space-your-text-picture_1258-53203.jpg'
              }
            />
          )}
          <View style={styles.pickImage}>
            <TouchableOpacity onPress={pickImage}>
              <Text style={styles.pickImageText}>Pick an image</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.todoHeader}>
          <TextInput
            value={edit?.title}
            style={styles.titleField}
            onChangeText={(val) => setEdit({ ...edit, title: val })}
          />
        </View>

        <TextInput
          style={styles.todoDescriptionContainer}
          value={edit?.description}
          onChangeText={(val) => setEdit({ ...edit, description: val })}
        />
        <View style={styles.tagList}>
          {todoTags.map((tag, idx) => {
            if (tag) {
              return (
                <View key={idx} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              );
            }
          })}
        </View>
        <View style={styles.footer}>
          <View style={styles.footerWrapper}>
            <TabBarIcon
              onPress={() => setEdit({ ...edit, important: !edit.important })}
              size={35}
              name={edit.important ? 'checkbox' : 'square-outline'}
              color={'#3B63FF'}
            />
            <Text style={styles.importantText}>Important</Text>
          </View>
          <TouchableOpacity onPress={handleEdit} style={styles.createButton}>
            <Text style={styles.buttonText}>Save edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ActionSheet>
  );
};

export default EditTodo;

const styles = StyleSheet.create({
  tabButton: {
    borderRadius: 10,
    width: 50,
    height: 6,
    backgroundColor: '#5F4B4B',
    position: 'absolute',
    left: '50%',
    top: 10,
  },
  createContainer: {
    height: 500,
    padding: 30,
    paddingVertical: 20,
    flexDirection: 'column',
    gap: 10,
  },
  coverPhoto: {
    height: 140,
    width: '100%',
    borderRadius: 5,
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
  todoTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  todoDescriptionContainer: {
    padding: 10,
    textAlignVertical: 'top',
    backgroundColor: '#f8f1f1',
    borderRadius: 5,
    height: 100,
  },
  todoDescription: {
    fontSize: 16,
  },
  tagList: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 10,
    height: 35,
  },
  tag: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginBottom: 5,
    backgroundColor: '#3B63FF',
    borderRadius: 50,
  },
  tagText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  todoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editRow: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'space-between',
  },
  deleteText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FF3B79',
    marginBottom: 10,
  },
  cancelText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#e7b5c5',
    marginBottom: 10,
  },
  titleField: {
    backgroundColor: '#F4E7E7',
    flex: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
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
});
