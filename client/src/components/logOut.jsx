import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
