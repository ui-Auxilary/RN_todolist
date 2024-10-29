import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Searchbar } from '@/components/Searchbar';

import Header from '@/components/Header';
import TodoItem from '@/components/TodoItem';
import { TodoItemProps } from '@/app/types/types';
import { useTodoData } from '@/hooks/TodoContext';

import { formatDate } from '@/hooks/formatDate';
import { fetchTags, fetchTodos } from '@/hooks/api';

const Todo = ({ navigation, route }: { navigation: any; route: any }) => {
  const { todos, setTodos, tags, setTags } = useTodoData();
  const [renderTodos, setRenderTodos] = useState<TodoItemProps[]>([]);
  let overDue = false;

  useEffect(() => {
    fetchTodos()
      .then(({ data }) => {
        setTodos(data.data.reverse());
      })
      .catch((e) => console.log(e));
    fetchTags()
      .then(({ data }) => {
        setTags(data.data);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (route.params?.newTodo) {
      fetchTodos()
        .then(({ data }) => {
          setTodos(data.data.reverse());
        })
        .catch((e) => console.log(e));
    }
  }, [route]);

  useEffect(() => {
    // Sort
    setRenderTodos(
      todos.sort((a, b) => -a.createdAt.localeCompare(b.createdAt))
    );
  }, [todos]);

  let date = new Date(Date.now());

  const dates = new Set();
  let formatString = formatDate(date);
  dates.add(formatString);

  return (
    <>
      <Header
        heading={'Your todos'}
        hideCreate={false}
        navigation={navigation}
      />
      <View style={styles.bodyWrapper}>
        <View>
          <Searchbar todos={todos} setTodos={setRenderTodos} />
          <Text style={styles.today}>{`Today, ${formatString}`}</Text>
          <ScrollView style={styles.todoScroll}>
            <View style={styles.todosWrapper}>
              {renderTodos
                ? renderTodos.map(
                    (
                      {
                        id,
                        title,
                        description,
                        important,
                        tagIDs,
                        photo,
                        updatedAt,
                        completed,
                      },
                      idx
                    ) => {
                      let date = formatDate(new Date(updatedAt as string));

                      if (date !== formatString && !overDue) {
                        overDue = true;
                        return (
                          <View key={id}>
                            <Text key={`${id}${idx}`} style={styles.today}>
                              Overdue
                            </Text>
                            <TodoItem
                              key={id}
                              id={id}
                              title={title}
                              description={description}
                              photo={photo}
                              tagIDs={tagIDs}
                              important={important}
                              updatedAt={updatedAt}
                              completed={completed}
                            />
                          </View>
                        );
                      } else {
                        return (
                          <TodoItem
                            key={id}
                            id={id}
                            title={title}
                            description={description}
                            photo={photo}
                            tagIDs={tagIDs}
                            important={important}
                            updatedAt={updatedAt}
                            completed={completed}
                          />
                        );
                      }
                    }
                  )
                : null}
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default Todo;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3B63FF',
    paddingHorizontal: 25,
    paddingTop: 50,
    paddingBottom: 30,
  },
  headerTitle: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
  },
  bodyWrapper: {
    flexDirection: 'column',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'space-between',
    flex: 1,
  },
  today: {
    fontSize: 20,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  todoContainer: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 20,
    height: 100,
  },
  todoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  todoBody: {},
  todoDrag: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
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
  todoCheckbox: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
  todoScroll: {
    marginBottom: 80,
  },
  todosWrapper: {
    flexDirection: 'column',
    gap: 10,
    display: 'flex',
  },
});
