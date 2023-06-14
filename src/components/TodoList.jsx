import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({
  todos, setTodos, delTodo, setUpdate,
}) => (
  <ul>
    {todos.map((todo) => (
      <TodoItem
        key={todo.id}
        itemProp={todo}
        setTodos={setTodos}
        delTodo={delTodo}
        setUpdate={setUpdate}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      completed: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
  setTodos: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired,
  setUpdate: PropTypes.func.isRequired,
};

export default TodoList;
