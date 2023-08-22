"use client";

import { useState } from "react";
import { trpc } from "../api/trpc/_trpc/client";
import { serverClient } from "../api/trpc/_trpc/serverClient";

export default function TodoList({
    initialTodos
}: {
    initialTodos: Awaited<ReturnType<(typeof serverClient)["getTodos"]>>;
}) {
    const [content, setContent] = useState("");

    const getTodos = trpc.getTodos.useQuery(undefined,{
        initialData: initialTodos,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });
    const addTodo = trpc.addTodo.useMutation({
        onSettled: () => {
            getTodos.refetch();
        }
    });
    const setDone = trpc.setDone.useMutation({
        onSettled: () => {
            getTodos.refetch();
        }
    });

    return (
        <div className="">
            <div className="text-white my-5 text-3xl">
                {getTodos.data?.map((todo) => (
                    <div key={todo.id} className="flex gap-3 items-center">
                        <input 
                            id={`check-${todo.id}`}
                            type="checkbox"
                            checked={!!todo.done}
                            style={{ zoom: 1.5 }}
                            onChange={async () => {
                                setDone.mutate({
                                    id: todo.id,
                                    done: todo.done ? 0 : 1,
                                })
                            }}
                        />
                        <label htmlFor={`check-${todo.id}`}>{todo.content}</label>
                    </div>
                ))}
                <div className="flex flex-col gap-4 items-center mt-24">
                    <label htmlFor="content">Content</label>
                    <input
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="text-black"
                    />
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={async () => {
                            if(content.length) {
                                addTodo.mutate(content);
                                setContent("");
                            }
                        }}
                    >
                        Add Todo
                    </button>
                </div>
            </div>
        </div>
    )
}