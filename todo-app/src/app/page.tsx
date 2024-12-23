"use client";

import { api } from "~/trpc/react";
import TodoList from "./_components/TodoList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Todo App
        </h1>
        <TodoList />
      </div>
    </main>
  );
}
