import React, { useState } from "react";
import axios from "axios";

const TaskItem = ({ task, onDelete, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  // PATCH обновление задачи
  const handleSave = async () => {
    if (!task.id) {
      alert("ID задачи не найден!");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // JWT
      await axios.patch(`http://localhost:3001/tasks/${task.id}`, editedTask, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      onSave(task.id, editedTask);
      setIsEditing(false);
    } catch (err) {
      console.error(
        "Ошибка при сохранении:",
        err.response?.data || err.message,
      );
      alert("Ошибка при сохранении задачи");
    }
  };

  // DELETE задача
  const handleDelete = async () => {
    if (!task.id) {
      alert("ID задачи не найден!");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // JWT
      await axios.delete(`http://localhost:3001/tasks/${task.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDelete(task.id);
    } catch (err) {
      console.error("Ошибка при удалении:", err.response?.data || err.message);
      alert("Ошибка при удалении задачи");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      {isEditing ? (
        <div>
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            placeholder="Заголовок"
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            placeholder="Описание"
          />
          <input
            type="text"
            name="status"
            value={editedTask.status}
            onChange={handleChange}
            placeholder="Статус"
          />
          <input
            type="text"
            name="priority"
            value={editedTask.priority}
            onChange={handleChange}
            placeholder="Приоритет"
          />
          <input
            type="date"
            name="due_date"
            value={editedTask.due_date}
            onChange={handleChange}
          />
          <input
            type="text"
            name="karada_project"
            value={editedTask.karada_project}
            onChange={handleChange}
            placeholder="Проект"
          />
          <input
            type="text"
            name="karada_test_label"
            value={editedTask.karada_test_label}
            onChange={handleChange}
            placeholder="Тест метка"
          />
          <input
            type="number"
            name="importance_score"
            value={editedTask.importance_score}
            onChange={handleChange}
            placeholder="Важность"
          />
          <button onClick={handleSave}>Сохранить</button>
          <button onClick={() => setIsEditing(false)}>Отмена</button>
        </div>
      ) : (
        <div>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Статус: {task.status}</p>
          <p>Приоритет: {task.priority}</p>
          <p>Дата: {task.due_date}</p>
          <p>Проект: {task.karada_project}</p>
          <p>Тест метка: {task.karada_test_label}</p>
          <p>Важность: {task.importance_score}</p>
          <button onClick={() => setIsEditing(true)}>Редактировать</button>
          <button onClick={handleDelete}>Удалить</button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
