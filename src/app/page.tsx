import { TodoList } from "@/components/todo-list";

export default async function HomePage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const res = await fetch(`${siteUrl}/api/todo`);
  const initialTodos = await res.json();

  return (
    <main className="flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold">The Todo App</h1>
      <TodoList initialTodos={initialTodos} />
    </main>
  );
}
