import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

const initialTodos = [
  { id: uuid(), title: "Buy groceries", completed: false },
  { id: uuid(), title: "Buy dog food", completed: false },
  { id: uuid(), title: "Buy cat food", completed: false },
];

export async function GET(request: NextRequest) {
  return NextResponse.json(initialTodos);
}
export async function POST(request: NextRequest) {
  const { title }: { title: string } = await request.json();
  const newTodo = { id: uuid(), title, completed: false };
  return NextResponse.json(newTodo);
}

export async function PATCH(request: NextRequest) {
  // update the todo completed state
  const {
    id,
    title,
    completed,
  }: { id: string; title: string; completed: boolean } = await request.json();
  const updatedTodo = { id, title, completed };
  return NextResponse.json(updatedTodo);
}

export async function DELETE(request: NextRequest) {
  const { id }: { id: string } = await request.json();
  return NextResponse.json(id);
}
