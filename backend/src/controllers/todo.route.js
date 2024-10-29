import prisma from '../client.js';

export const createTodo = async (req, res) => {
  try {
    const todo = await prisma.todo.create({
      data: req.body,
    });

    res.status(201).json({
      status: true,
      message: 'Todo successfullly created',
      data: todo,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: false,
      message: 'Server error',
    });
  }
};

export const getTodos = async (req, res) => {
  const todos = await prisma.todo.findMany({
    where: {
      completed: false,
    },
  });

  res.json({
    status: true,
    message: 'Todos successfully fetched',
    data: todos,
  });
};

export const updateTodo = async (req, res) => {
  const updatedTodo = await prisma.todo.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  res.json({
    status: true,
    message: 'Todos successfully fetched',
    data: updatedTodo,
  });
};

export const deleteTodo = async (req, res) => {
  const deleteTodo = await prisma.todo.delete({
    where: {
      id: req.params.id,
    },
  });

  res.json({
    status: true,
    message: 'Todos successfully fetched',
    data: deleteTodo,
  });
};

export const getFilteredTodos = async (req, res) => {
  let query = req.params?.query;
  let [command, arg] = query.split('=');

  const todos = await prisma.todo.findMany({
    where: {
      completed: true,
    },
  });

  res.json({
    status: true,
    message: 'Todos successfully fetched',
    data: todos,
  });
};

export const getTags = async (req, res) => {
  const tags = await prisma.tag.findMany();

  res.json({
    status: true,
    message: 'Tags successfully fetched',
    data: tags,
  });
};

export const getTag = async (req, res) => {
  const tags = await prisma.tag.findMany({
    where: {
      id: req.params.id,
    },
  });

  res.json({
    status: true,
    message: 'Tag successfully fetched',
    data: tags[0],
  });
};
