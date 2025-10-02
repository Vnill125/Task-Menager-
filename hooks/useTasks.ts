"use client";

import { useEffect, useState } from "react";
import { db, auth } from "../lib/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";

export type Task = {
  id: string;
  content: string;
  status: "todo" | "inprogress" | "done";
  createdAt?: any;
};

export function useTasks() {
  const [user] = useAuthState(auth);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!user) {
      setTasks([]);
      return;
    }

    const colRef = collection(db, "boards", user.uid, "tasks");
    const q = query(colRef, orderBy("createdAt", "asc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const arr: Task[] = snapshot.docs.map((d) => {
        const data = d.data() as any;
        return {
          id: d.id,
          content: data.content ?? "",
          status: (data.status as Task["status"]) ?? "todo",
          createdAt: data.createdAt,
        };
      });
      setTasks(arr);
    });

    return () => unsub();
  }, [user]);

  const addTask = async (content: string) => {
    if (!user) return;
    await addDoc(collection(db, "boards", user.uid, "tasks"), {
      content,
      status: "todo",
      createdAt: serverTimestamp(),
    });

    try {toast.success("Task added");}
    catch (err) {
      toast.error("Error adding task");
      console.error("Error adding task:", err);
    }
    
  };

  // zmienia tylko status (kolumnę)
  const updateTask = async (id: string, status: Task["status"]) => {
    if (!user) return;
    const docRef = doc(db, "boards", user.uid, "tasks", id);
    await updateDoc(docRef, { status });
  };

  // aktualizuje treść zadania
  const updateTaskContent = async (id: string, content: string) => {
    if (!user) return;
    const docRef = doc(db, "boards", user.uid, "tasks", id);
    await updateDoc(docRef, { content });

    try {toast.success("Task updated");}
    catch (err) {
      toast.error("Error updating task");
      console.error("Error updating task:", err);
    }
  };

  const deleteTask = async (id: string) => {
    if (!user) return;
    const docRef = doc(db, "boards", user.uid, "tasks", id);
    await deleteDoc(docRef);

    try {toast("Task deleted ❌");}
    catch (err) {
      toast.error("Error deleting task");
      console.error("Error deleting task:", err);
    }
  };

  return { tasks, addTask, updateTask, updateTaskContent, deleteTask };
}
