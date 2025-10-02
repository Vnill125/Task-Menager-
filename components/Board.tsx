"use client";

import React, { useMemo, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { useTasks, Task } from "../hooks/useTasks";
import TaskCard from "./TaskCard";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { FiSearch, FiPlus, FiTrash2 } from "react-icons/fi";

type Column = { id: string; title: string; accent: string };

export default function Board() {
  const { tasks, addTask, updateTask, updateTaskContent, deleteTask } =
    useTasks();
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");

  const columns: Column[] = [
    { id: "todo", title: "📝 To Do", accent: "border-blue-400" },
    { id: "inprogress", title: "🚧 In Progress", accent: "border-yellow-400" },
    { id: "done", title: "✅ Done", accent: "border-green-400" },
  ];

  const filteredTasks = useMemo(() => {
    const s = search.trim().toLowerCase();
    return tasks.filter((t) =>
      s ? t.content.toLowerCase().includes(s) : true
    );
  }, [tasks, search]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    await addTask(input.trim());
    setInput("");
  };

  const onDragEnd = (result: DropResult) => {
    const { draggableId, destination, source } = result;
    if (!destination) return;
    if (destination.droppableId !== source.droppableId) {
      updateTask(draggableId, destination.droppableId as Task["status"]);
    }
  };

  return (
    <div className="min-h-[90vh] max-w-8xl mx-auto bg-gradient-to-br from-gray-950 to-gray-900 text-gray-100 p-8 rounded-2xl shadow-lg">

      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-wide">🎯 Kanban Board</h1>
          <p className="text-gray-400 text-lg mt-1">
            Stay focused, stay organized 🚀
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks..."
              className="pl-10 pr-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-sm w-72 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Sign Out */}
          <button
            onClick={() => signOut(auth)}
            className="px-5 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition shadow"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Add task form */}
      <form onSubmit={handleAdd} className="flex gap-3 mb-8">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add new task..."
          className="flex-1 p-4 rounded-xl bg-gray-800 border border-gray-700 placeholder-gray-400 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="px-6 py-3 bg-blue-600 rounded-xl text-white text-lg hover:bg-blue-700 transition shadow">
          Add
        </button>
      </form>

      {/* Columns */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((col) => {
            const colTasks = filteredTasks.filter((t) => t.status === col.id);
            return (
              <Droppable key={col.id} droppableId={col.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`rounded-2xl p-5 min-h-[500px] bg-gradient-to-b from-gray-900 to-gray-800 border ${col.accent} border-opacity-40 shadow-lg`}
                  >
                    {/* Column Header */}
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="text-xl font-semibold flex items-center gap-2">
                        {col.title}
                      </h2>
                      <span className="bg-white text-gray-900 rounded-full px-3 py-1 text-xs font-bold shadow">
                        {colTasks.length}
                      </span>
                    </div>

                    {/* Tasks */}
                    <div className="flex flex-col gap-3">
                      {colTasks.length === 0 && (
                        <div className="text-sm text-gray-500 italic">
                          No tasks
                        </div>
                      )}
                      {colTasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(providedDraggable, snapshot) => (
                            <div
                              ref={providedDraggable.innerRef}
                              {...providedDraggable.draggableProps}
                              style={providedDraggable.draggableProps.style}
                            >
                              <TaskCard
                                task={task}
                                dragHandleProps={providedDraggable.dragHandleProps}
                                onDelete={() => deleteTask(task.id)}
                                onUpdate={(newContent) =>
                                  updateTaskContent(task.id, newContent)
                                }
                                isDragging={snapshot.isDragging}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
      {/* Footer */}
      <footer className="mt-10 text-center text-gray-500 text-sm">
        Made with ❤️ for productivity
      </footer>
    </div>
  );
}
