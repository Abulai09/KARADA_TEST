import React, { useState } from "react";
import axiosInstance from "../api/axios";

const TaskForm = ({ onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "new",
    priority: 1,
    due_date: "",
    karada_project: "other",
    karada_test_label: "test1", // первый вариант по ТЗ
    importance_score: 1,
  });

  // Варианты строго по ТЗ
  const statusOptions = ["new", "in-progress", "done"];
  const projectOptions = ["other", "karada_u", "prohuntr"];
  const testLabelOptions = ["KARADA_FULLSTACK_TEST"];
  const importanceOptions = [1, 2, 3, 4, 5];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "importance_score" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/tasks", formData);
      setFormData({
        title: "",
        description: "",
        status: "new",
        priority: 1,
        due_date: "",
        karada_project: "other",
        karada_test_label: "test1",
        importance_score: 1,
      });
      if (onTaskCreated) onTaskCreated();
    } catch (err) {
      console.error(
        "Ошибка при создании задачи:",
        err.response?.data || err.message,
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <input
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />

      {/* Статус задачи */}
      <select name="status" value={formData.status} onChange={handleChange}>
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <input
        name="priority"
        type="number"
        placeholder="Priority"
        value={formData.priority}
        onChange={handleChange}
      />
      <input
        name="due_date"
        type="date"
        value={formData.due_date}
        onChange={handleChange}
      />

      {/* Проект */}
      <select
        name="karada_project"
        value={formData.karada_project}
        onChange={handleChange}
      >
        {projectOptions.map((project) => (
          <option key={project} value={project}>
            {project}
          </option>
        ))}
      </select>

      {/* Тест Label строго по ТЗ */}
      <select
        name="karada_test_label"
        value={formData.karada_test_label}
        onChange={handleChange}
      >
        {testLabelOptions.map((label) => (
          <option key={label} value={label}>
            {label}
          </option>
        ))}
      </select>

      {/* Важность 1-5 */}
      <select
        name="importance_score"
        value={formData.importance_score}
        onChange={handleChange}
      >
        {importanceOptions.map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>

      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
