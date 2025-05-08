import { TodoList } from "@/components/todo-list";
import { headers } from "next/headers";

export default async function HomePage() {
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const siteUrl = `${protocol}://${host}`;
  const res = await fetch(`${siteUrl}/api/todo`);
  const initialTodos = await res.json();

  return (
    <main className="flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold">The Todo App</h1>
      <TodoList initialTodos={initialTodos} />
    </main>
  );
}
