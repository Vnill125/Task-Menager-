"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Task = {
  id: string;
  content: string;
  status?: string;
};

type Props = {
  task: Task;
  onDelete?: () => void;
  onUpdate?: (newContent: string) => void;
  isDragging?: boolean;
};

export default function TaskCard({
  task,
  onDelete,
  onUpdate,
  isDragging,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.content);

  const handleSave = async () => {
    const trimmed = value.trim();
    if (!trimmed) {
      setValue(task.content);
      setIsEditing(false);
      return;
    }
    if (trimmed !== task.content) {
      onUpdate && (await onUpdate(trimmed));
    }
    setIsEditing(false);
  };

  return (
    <motion.div
      layout 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: isDragging ? 1.05 : 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`p-4 rounded-xl bg-gray-800 border border-gray-700 shadow-md text-gray-100
  ${isDragging ? "ring-2 ring-blue-500 scale-105 shadow-lg" : "hover:scale-[1.02] hover:shadow-lg"}
  transition-transform transition-shadow duration-300 ease-in-out cursor-grab`}
    >
      <div className="flex justify-between items-start gap-3">
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
            className="flex-1 px-2 py-1 rounded bg-gray-700 border border-gray-600 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        ) : (
          <p
            className="flex-1 text-sm leading-relaxed cursor-pointer select-none"
            onDoubleClick={() => setIsEditing(true)}
            title="Double-click to edit"
          >
            {task.content}
          </p>
        )}

        <button
          onClick={onDelete}
          className="text-red-400 hover:text-red-500 text-sm transition"
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
}
