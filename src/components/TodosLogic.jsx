import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import InputTodo from './InputTodo';
import TodoList from './TodoList';

const TodoLogic = () => {
  function getInitialTodos() {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  }

  const [todos, setTodos] = useState(getInitialTodos());

  const delTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const addTodoItem = (title) => {
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const setUpdate = (updatedTitle, id) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title: updatedTitle,
        };
      }
      return todo;
    }));
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  return (
    <div>
      <InputTodo addTodoItem={addTodoItem} />
      <TodoList todos={todos} setTodos={setTodos} delTodo={delTodo} setUpdate={setUpdate} />
    </div>
  );
};

export default TodoLogic;
