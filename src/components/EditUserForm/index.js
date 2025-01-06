import React, { useState } from "react";

const EditUserForm = ({ user, fetchUserData, setEditMode }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://testing-mongo-backend.onrender.com/api/users/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        alert("Details updated successfully!");
        fetchUserData(); // Refresh user data
        setEditMode(false); // Exit edit mode
      } else {
        throw new Error("Failed to update user details.");
      }
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-user-form">
      <h3>Edit Your Details</h3>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      <button type="submit">Save Changes</button>
      <button
        type="button"
        onClick={() => setEditMode(false)}
        style={{ marginLeft: "10px" }}
      >
        Cancel
      </button>
    </form>
  );
};

export default EditUserForm;
