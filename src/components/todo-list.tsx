"use client";

import { useState } from "react";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export const TodoList = ({ initialTodos }: { initialTodos: Todo[] }) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  // Submit the new todo to the api
  const handleSubmit = async (title: string) => {
    const res = await fetch("/api/todo", {
      method: "POST",
      body: JSON.stringify({ title }),
    });
    const newTodo = await res.json();
    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleTodoToggle = async (id: string) => {
    const todo = todos?.find((todo) => todo.id === id);

    // Update the todo from the api and sort the todos by completed state
    const res = await fetch("/api/todo", {
      method: "PATCH",
      body: JSON.stringify({
        id,
        title: todo?.title,
        completed: !todo?.completed,
      }),
    });
    const updatedTodo = await res.json();
    // update the todos array with the updated todo and sort the todos by completed state
    setTodos((prev) => [...prev.filter((todo) => todo.id !== id), updatedTodo]);
  };

  const handleTodoDelete = async (id: string) => {
    // Delete the todo from the api and sort the todos by completed state
    const res = await fetch("/api/todo", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    const deletedTodoId = await res.json();
    setTodos(todos.filter((todo) => todo.id !== deletedTodoId));
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
        className="bg-red-500 text-white px-2 py-1 rounded-md "
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
  handleSubmit: (title: string) => void;
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
