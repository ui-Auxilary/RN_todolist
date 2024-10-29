import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { Searchbar } from '@/components/Searchbar';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { registerSheet, SheetManager } from 'react-native-actions-sheet';
import CreateTodo from '@/components/CreateTodo';
import Header from '@/components/Header';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';

const Todo = ({ navigation }: { navigation: any }) => {
  return (
    <>
      <Header heading={'Your todos'} />
      <View style={styles.bodyWrapper}>
        <View>
          <Searchbar />
          <Text style={styles.today}>Today, 25th Oct</Text>
          <ScrollView>
            <View style={styles.todoContainer}>
              <View style={styles.todoWrapper}>
                <TabBarIcon
                  size={20}
                  name={'ellipsis-vertical'}
                  color={'#E6E6E6'}
                />
                <View style={styles.todoBody}>
                  <Text style={styles.todoTitle}>Walk the dog</Text>
                  <Text style={styles.todoSpan}>
                    Take the dog for a walk and...
                  </Text>
                  <View>
                    <Text>Active</Text>
                  </View>
                </View>
              </View>
              <TabBarIcon size={35} name={'square-outline'} color={'#EBBFBF'} />
            </View>
          </ScrollView>
        </View>
        <TabBarIcon
          style={styles.createButton}
          onPress={() => navigation.navigate('create')}
          size={80}
          name={'add-circle'}
          color={'#3C63FF'}
        />
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
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  createButton: {
    alignSelf: 'flex-end',
  },
});
