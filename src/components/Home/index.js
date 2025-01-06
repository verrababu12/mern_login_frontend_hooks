import React, { useState, useEffect } from "react";
import EditUserForm from "../EditUserForm";
import "./index.css";

const Home = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // Fetch user data (replace user ID logic as needed)
  const fetchUserData = async () => {
    try {
      const response = await fetch(
        "https://testing-mongo-backend.onrender.com/api/users"
      );
      const data = await response.json();
      setUser(data[0]); // Mocked to use the first user for demo purposes
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Delete user account
  const deleteUserAccount = async () => {
    if (!user) return;
    try {
      await fetch(
        `https://testing-mongo-backend.onrender.com/api/users/${user._id}`,
        {
          method: "DELETE",
        }
      );
      alert("Account deleted successfully.");
      setUser(null); // Clear user data
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-header">User Dashboard</h1>
      {user ? (
        <div>
          {editMode ? (
            <EditUserForm
              user={user}
              fetchUserData={fetchUserData}
              setEditMode={setEditMode}
            />
          ) : (
            <div className="user-details">
              <h2>Welcome, {user.name}</h2>
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <button onClick={() => setEditMode(true)}>Edit Details</button>
              <button
                onClick={deleteUserAccount}
                style={{ marginLeft: "10px" }}
              >
                Delete Account
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="no-user">No user logged in or user account deleted.</p>
      )}
    </div>
  );
};

export default Home;
