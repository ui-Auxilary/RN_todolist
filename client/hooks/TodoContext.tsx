import { TagProps, TodoItemProps } from '@/app/types/types';
import React, { createContext, ReactNode, useContext, useState } from 'react';

export interface TodoProviderType {
  tags: TagProps[];
  setTags: React.Dispatch<React.SetStateAction<TagProps[]>>;
  todos: TodoItemProps[];
  setTodos: React.Dispatch<React.SetStateAction<TodoItemProps[]>>;
}

export const TodoContext = createContext<TodoProviderType>({
  tags: [],
  setTags: () => {},
  todos: [],
  setTodos: () => {},
});

export const useTodoData = () => useContext(TodoContext);

export const TodoProvider = ({ children }: { children?: ReactNode }) => {
  const [todos, setTodos] = useState<TodoItemProps[]>([]);
  const [tags, setTags] = useState<TagProps[]>([]);

  return (
    <TodoContext.Provider value={{ tags, setTags, todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
};
