export interface TodoItemProps {
  id: string;
  title: string;
  description: string;
  photo: string;
  tagIDs: string[];
  important: boolean;
  updatedAt?: string;
  createdAt?: string;
  completed: boolean;
}

export interface TagProps {
  id: string;
  name: string;
  todoIDs: string[];
}
