import { useTodoData } from '@/hooks/TodoContext';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import { TabBarIcon } from './navigation/TabBarIcon';

const ViewTodo = ({ payload }: SheetProps<'view-sheet'>) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [viewTag, setViewTag] = useState<string[]>([]);

  const { tags } = useTodoData();

  const containsKey = (id: string) => {
    return tags.find((tag) => tag.id === id);
  };

  useEffect(() => {
    payload?.tagIDs.filter((tag) => {
      let foundTag = containsKey(tag);
      if (foundTag) {
        setViewTag((prev) => [...prev, foundTag.name]);
      }
    });
  }, [tags]);

  return (
    <ActionSheet ref={actionSheetRef}>
      <View style={styles.createContainer}>
        <Pressable
          onPress={() => {
            SheetManager.hide('view-sheet');
          }}
          style={styles.tabButton}
        />
        <View style={styles.coverPhoto}>
          {payload?.photo ? (
            <Image style={styles.coverPhoto} source={{ uri: payload.photo }} />
          ) : (
            <Image
              style={styles.coverPhoto}
              src={
                'https://img.freepik.com/free-photo/blue-gradient-abstract-background-empty-room-with-space-your-text-picture_1258-53203.jpg'
              }
            />
          )}
        </View>
        <View style={styles.todoHeader}>
          <Text style={styles.todoTitle}>{payload?.title}</Text>

          <Pressable
            onPress={() => {
              SheetManager.show('edit-sheet', {
                payload: {
                  id: payload?.id || '',
                  title: payload?.title || '',
                  description: payload?.description || '',
                  photo: payload?.photo || '',
                  tagIDs: payload?.tagIDs || [],
                  important: payload?.important || false,
                },
              });
            }}
            style={styles.editRow}
          >
            <Text style={styles.editText}>Edit</Text>
            <TabBarIcon size={20} name={'pencil-outline'} color={'#3B63FF'} />
          </Pressable>
        </View>
        <View style={styles.todoDescriptionContainer}>
          <Text style={styles.todoDescription}>{payload?.description}</Text>
        </View>
        <View style={styles.tagList}>
          {viewTag.map((tag, idx) => {
            if (tag) {
              return (
                <View key={idx} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              );
            }
          })}
        </View>
      </View>
    </ActionSheet>
  );
};

export default ViewTodo;

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
    flexDirection: 'column',
    gap: 10,
  },
  coverPhoto: {
    height: 200,
    borderRadius: 20,
  },
  todoTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  todoDescriptionContainer: {
    padding: 10,
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
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: '#3B63FF',
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  editText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#3B63FF',
  },
  titleField: {
    backgroundColor: '#F4E7E7',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
