"use client";

import { useState } from "react";
import { v4 as uuid } from "uuid";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export const TodoList = ({ initialTodos }: { initialTodos: Todo[] }) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const handleSubmit = (newTodo: string) => {
    setTodos((prev) => [
      { id: uuid(), title: newTodo, completed: false },
      ...prev,
    ]);
  };

  const handleTodoToggle = (id: string) => {
    // update and sort the todos by completed state
    setTodos(
      todos
        .map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
        .sort((a, b) => Number(a.completed) - Number(b.completed))
    );
  };

  const handleTodoDelete = (id: string) => {
    // delete the todo
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <TodoForm handleSubmit={handleSubmit} />

      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleTodoToggle={handleTodoToggle}
          handleTodoDelete={handleTodoDelete}
        />
      ))}
    </div>
  );
};

const TodoItem = ({
  todo,
  handleTodoToggle,
  handleTodoDelete,
}: {
  todo: Todo;
  handleTodoToggle: (id: string) => void;
  handleTodoDelete: (id: string) => void;
}) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor={todo.id}>
        <input
          id={todo.id}
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleTodoToggle(todo.id)}
        />
        <span
          className={`${
            todo.completed ? "line-through" : ""
          } text-lg font-medium ml-2`}
        >
          {todo.title}
        </span>
      </label>
      <button
        className="bg-red-500 text-white px-2 py-1 rounded-md"
        onClick={() => handleTodoDelete(todo.id)}
      >
        Delete
      </button>
    </div>
  );
};

const TodoForm = ({
  handleSubmit,
}: {
  handleSubmit: (newTodo: string) => void;
}) => {
  const [title, setTitle] = useState("");

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(title);
        setTitle("");
      }}
    >
      <input
        type="text"
        placeholder="Add a todo"
        className="border border-gray-300 rounded-md px-2 py-1"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-2 py-1 rounded-md"
      >
        Add
      </button>
    </form>
  );
};
