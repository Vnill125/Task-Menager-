"use client";

import React, { useState } from "react";
import { RxDragHandleDots2 } from "react-icons/rx";

type Task = {
  id: string;
  content: string;
  status?: string;
};

type Props = {
  task: Task;
  dragHandleProps?: any;
  onDelete?: () => void;
  onUpdate?: (newContent: string) => void;
  isDragging?: boolean;
};

export default function TaskCard({
  task,
  dragHandleProps,
  onDelete,
  onUpdate,
  isDragging,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.content);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete && onDelete();
  };

  const handleSave = async () => {
    const trimmed = value.trim();
    if (!trimmed) {
      setValue(task.content);
      setIsEditing(false);
      return;
    }
    if (trimmed === task.content) {
      setIsEditing(false);
      return;
    }
    onUpdate && (await onUpdate(trimmed));
    setIsEditing(false);
  };

  return (
    <div
      className={`p-4 rounded-xl shadow-md flex items-center gap-3 transition text-lg
        ${
          isDragging
            ? "bg-blue-600 text-white scale-105"
            : "bg-gray-100 text-gray-900 hover:bg-gray-200"
        }`}
    >
      {/* Drag handle */}
      <button
        {...(dragHandleProps || {})}
        aria-label="Drag handle"
        className="p-1 rounded cursor-grab text-gray-600 hover:text-black"
      >
        <RxDragHandleDots2 size={22} />
      </button>

      {/* Content / Edit */}
      {isEditing ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") {
              setValue(task.content);
              setIsEditing(false);
            }
          }}
          autoFocus
          className="flex-1 p-2 rounded bg-white text-gray-900 border border-gray-300 text-lg"
        />
      ) : (
        <div
          className="flex-1 select-none cursor-pointer"
          onDoubleClick={() => setIsEditing(true)}
          title="Double-click to edit"
        >
          {task.content}
        </div>
      )}

      {/* Delete */}
      <button
        type="button"
        onClick={handleDelete}
        className="ml-2 text-xl text-red-500 hover:text-red-700"
      >
        ❌
      </button>
    </div>
  );
}
