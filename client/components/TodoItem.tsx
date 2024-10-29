import { TagProps, TodoItemProps } from '@/app/types/types';
import { BASE_URL } from '@/constants/api';
import { fetchTags } from '@/hooks/api';
import { useTodoData } from '@/hooks/TodoContext';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';
import { TabBarIcon } from './navigation/TabBarIcon';

const TodoItem = ({
  id,
  title,
  description,
  photo,
  tagIDs,
  important,
  updatedAt,
  completed,
}: TodoItemProps) => {
  const [complete, setComplete] = useState(completed);
  const { todos, setTodos, tags } = useTodoData();
  const [viewTag, setViewTag] = useState<string[]>([]);

  useEffect(() => {
    fetchTags().then(({ data }) => {
      let tagData = data.data.map((tag: TagProps) => {
        if (tagIDs.includes(tag.id)) {
          return tag.name;
        }
      });

      setViewTag(tagData);
    });
  }, [tags]);

  const handleComplete = () => {
    axios
      .put(`${BASE_URL}/todos/edit/${id}`, {
        completed: !complete,
      })
      .then(({ data }) => {
        // Update list
        if (complete) {
          let newTodos = todos.filter((todo) => todo.id != id);
          newTodos = [...newTodos, data.data];

          setTodos(
            newTodos.sort((a, b) => -a.createdAt.localeCompare(b.createdAt))
          );
        } else {
          let newTodos = todos.filter((todo) => todo.id != id);
          setTodos(
            newTodos.sort((a, b) => -a.createdAt.localeCompare(b.createdAt))
          );
        }
        setComplete(!complete);
      })
      .catch((e) => console.log(e));
  };

  return (
    <Pressable
      onPress={() =>
        completed
          ? {}
          : SheetManager.show('view-sheet', {
              payload: {
                id,
                title,
                description,
                photo,
                tagIDs,
                important,
              },
            })
      }
      style={styles.todoContainer}
    >
      <View style={styles.todoWrapper}>
        {important ? <View style={styles.todoTagLine} /> : null}
        <View>
          {important ? (
            <Text style={styles.importantText}>important</Text>
          ) : null}
          <Text style={styles.todoTitle}>{title}</Text>
          <Text style={styles.todoSpan}>
            {description.length < 20
              ? description
              : `${description.substring(20)}...`}
          </Text>
          <View style={styles.tagWrapper}>
            {viewTag &&
              viewTag.map((tag, idx) => {
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
      </View>
      <TabBarIcon
        onPress={handleComplete}
        size={35}
        name={complete ? 'checkbox' : 'square-outline'}
        color={complete ? '#3B63FF' : '#EBBFBF'}
      />
    </Pressable>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  todoContainer: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 20,
    height: 100,
    position: 'relative',
  },
  todoTagLine: {
    position: 'absolute',
    left: -10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: '#3a2ee7',
    height: 100,
    width: 10,
  },
  todoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 15,
  },

  todoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  todoSpan: {
    fontSize: 12,
    color: '#BBBBBB',
  },
  todoTag: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
  importantText: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#3a2ee7',
  },
  tagWrapper: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 5,
  },
  tag: {
    paddingHorizontal: 10,
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
});
