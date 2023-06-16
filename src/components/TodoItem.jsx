import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import PropTypes from 'prop-types';
import styles from '../styles/TodoItem.module.css';
import { useAuthContext } from '../context/AuthContext';

const TodoItem = ({
  itemProp, setTodos, delTodo, setUpdate,
}) => {
  const { user } = useAuthContext();
  const [editing, setEditing] = useState(false);

  const handleEditing = () => {
    setEditing(true);
  };

  const viewModeStyles = {};
  const editModeStyles = {};
  if (editing) {
    viewModeStyles.display = 'none';
  } else {
    editModeStyles.display = 'none';
  }

  const completedStyle = {
    fontStyle: 'italic',
    color: '#595959',
    opacity: 0.4,
    textDecoration: 'line-through',
  };

  const handleChange = (id) => {
    setTodos((prevState) => prevState.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    }));
  };

  const handleUpdatedDone = (event) => {
    if (event.key === 'Enter') {
      setEditing(false);
    }
  };

  return (
    <li className={styles.item}>
      <div className={styles.content} style={viewModeStyles}>
        <input
          type="checkbox"
          checked={itemProp.completed}
          onChange={() => handleChange(itemProp.id)}
        />
        {user && (
          <button onClick={handleEditing} aria-label="Edit" type="button">
            <AiFillEdit />
          </button>
        )}
        <button onClick={() => delTodo(itemProp.id)} aria-label="Delete" type="button">
          <FaTrash />
        </button>
        <span style={itemProp.completed ? completedStyle : null}>
          {itemProp.title}
        </span>
      </div>
      <input
        type="text"
        value={itemProp.title}
        className={styles.textInput}
        style={editModeStyles}
        onChange={(e) => setUpdate(e.target.value, itemProp.id)}
        onKeyDown={handleUpdatedDone}
      />
    </li>
  );
};

TodoItem.propTypes = {
  itemProp: PropTypes.shape({
    completed: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  setTodos: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired,
  setUpdate: PropTypes.func.isRequired,
};

export default TodoItem;
