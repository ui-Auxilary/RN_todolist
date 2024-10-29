import Ionicons from '@expo/vector-icons/Ionicons';
import {
  StyleSheet,
  Image,
  Platform,
  View,
  ScrollView,
  Text,
} from 'react-native';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTodoData } from '@/hooks/TodoContext';
import TodoItem from '@/components/TodoItem';
import Header from '@/components/Header';

import { BASE_URL } from '@/constants/api';
import { getNth } from '@/hooks/formatDate';

const Completed = ({ navigation, route }: { navigation: any; route: any }) => {
  const { todos } = useTodoData();
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/todos/filter/completed=true`)
      .then(({ data }) => setCompleted(data.data))
      .catch((e) => console.log(e));
  }, [todos]);

  let dates = new Set();

  return (
    <>
      <Header
        heading={'Completed todos'}
        hideCreate={true}
        navigation={navigation}
      />
      <View style={styles.bodyWrapper}>
        <View>
          <ScrollView style={styles.todoScroll}>
            <View style={styles.todosWrapper}>
              {completed
                ? completed.map(
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
                      let date = new Date(updatedAt as string);
                      let day = getNth(date.getDate());
                      let formatString = `${day} ${date.toLocaleString(
                        'default',
                        {
                          month: 'short',
                          year: 'numeric',
                        }
                      )}`;

                      console.log('FORMAT', formatString, dates);
                      if (!dates.has(formatString)) {
                        dates.add(formatString);
                        return (
                          <View key={idx}>
                            <Text key={updatedAt} style={styles.today}>
                              {formatString}
                            </Text>
                            <TodoItem
                              key={id}
                              id={id}
                              title={title}
                              description={description}
                              photo={photo}
                              tagIDs={tagIDs}
                              important={important}
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

export default Completed;

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
    height: '100%',
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
    height: 200,
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
  todoScroll: {},
  todosWrapper: {
    flexDirection: 'column',
    gap: 10,
    display: 'flex',
    height: '100%',
    flex: 1,
  },
});
