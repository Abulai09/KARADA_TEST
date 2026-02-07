import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import axiosInstance from "../api/axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axiosInstance.get("/tasks");
      setTasks(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveTask = (id, updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task,
      ),
    );
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>My Tasks</h2>
      <TaskForm onTaskCreated={fetchTasks} />
      {(tasks || []).map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={fetchTasks}
          onDelete={fetchTasks}
          onSave={handleSaveTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
