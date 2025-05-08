import { TodoList } from "@/components/todo-list";
import { v4 as uuid } from "uuid";

const initialTodos = [
  { id: uuid(), title: "Buy groceries", completed: false },
  { id: uuid(), title: "Buy dog food", completed: false },
  { id: uuid(), title: "Buy cat food", completed: false },
];

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold">The Todo App</h1>
      <TodoList initialTodos={initialTodos} />
    </main>
  );
}
