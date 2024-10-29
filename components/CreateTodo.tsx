import { View, Text, StyleSheet } from 'react-native';
import React, { useRef } from 'react';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';

const CreateTodo = () => {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  return (
    <ActionSheet ref={actionSheetRef}>
      <View style={styles.createContainer}>
        <Text>Hi, I am here.</Text>
      </View>
    </ActionSheet>
  );
};

export default CreateTodo;

const styles = StyleSheet.create({
  createContainer: {
    height: 500,
    padding: 20,
  },
});
