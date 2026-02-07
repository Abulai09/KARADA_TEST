import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import TaskList from "./components/TaskList";
import Navbar from "./components/logOut";

function App() {
  const { token } = useSelector((state) => state.auth);

  return (
    <div className="App">
      {token && <Navbar />}
      <Routes>
        <Route
          path="/login"
          element={!token ? <LoginForm /> : <Navigate to="/tasks" />}
        />
        <Route
          path="/register"
          element={!token ? <RegisterForm /> : <Navigate to="/tasks" />}
        />
        <Route
          path="/tasks"
          element={token ? <TaskList /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={<Navigate to={token ? "/tasks" : "/login"} />}
        />
      </Routes>
    </div>
  );
}

export default App;
