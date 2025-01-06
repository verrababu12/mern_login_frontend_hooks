import React, { useState, useEffect } from "react";
import "./index.css";

const Home = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState({ name: "", email: "" });

  // Fetch logged-in user data
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://testing-mongo-backend.onrender.com/api/users/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setUser(data);
        setUpdatedDetails({ name: data.name, email: data.email });
      } else {
        console.error("Failed to fetch user data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Handle update user details
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://testing-mongo-backend.onrender.com/api/users/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedDetails),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setUser(data.updatedUser);
        setEditMode(false);
      } else {
        console.error("Failed to update user:", data.message);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Handle delete user account
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://testing-mongo-backend.onrender.com/api/users/${user._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        localStorage.removeItem("token");
        alert("Account deleted successfully.");
        window.location.reload();
      } else {
        const data = await response.json();
        console.error("Failed to delete user:", data.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-header">User Dashboard</h1>
      {user ? (
        <div className="user-details">
          {editMode ? (
            <div className="edit-container">
              <h3>Edit Your Details</h3>
              <div>
                <label>Name: </label>
                <input
                  type="text"
                  value={updatedDetails.name}
                  onChange={(e) =>
                    setUpdatedDetails({
                      ...updatedDetails,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <br />
              <div>
                <label>Email: </label>
                <input
                  type="email"
                  value={updatedDetails.email}
                  onChange={(e) =>
                    setUpdatedDetails({
                      ...updatedDetails,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <br />
              <button onClick={handleUpdate} className="save-btn">
                Save
              </button>
              <button onClick={() => setEditMode(false)} className="cancel-btn">
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <h2>Welcome, {user.name}</h2>
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <button onClick={() => setEditMode(true)} className="edit-btn">
                Edit
              </button>
              <button onClick={handleDelete} className="delete-btn">
                Delete Account
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="no-user">No user logged in or failed to fetch data.</p>
      )}
    </div>
  );
};

export default Home;

// import React, { useState, useEffect } from "react";
// import EditUserForm from "../EditUserForm";
// import "./index.css";

// const Home = () => {
//   const [user, setUser] = useState(null);
//   const [editMode, setEditMode] = useState(false);

//   // Fetch user data (replace user ID logic as needed)
//   const fetchUserData = async () => {
//     try {
//       const response = await fetch(
//         "https://testing-mongo-backend.onrender.com/api/users"
//       );
//       const data = await response.json();
//       setUser(data[0]); // Mocked to use the first user for demo purposes
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   // Delete user account
//   const deleteUserAccount = async () => {
//     if (!user) return;
//     try {
//       await fetch(
//         `https://testing-mongo-backend.onrender.com/api/users/${user._id}`,
//         {
//           method: "DELETE",
//         }
//       );
//       alert("Account deleted successfully.");
//       setUser(null); // Clear user data
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };

//   return (
//     <div className="home-container">
//       <h1 className="home-header">User Dashboard</h1>
//       {user ? (
//         <div>
//           {editMode ? (
//             <EditUserForm
//               user={user}
//               fetchUserData={fetchUserData}
//               setEditMode={setEditMode}
//             />
//           ) : (
//             <div className="user-details">
//               <h2>Welcome, {user.name}</h2>
//               <p>
//                 <strong>Username:</strong> {user.username}
//               </p>
//               <p>
//                 <strong>Email:</strong> {user.email}
//               </p>
//               <button onClick={() => setEditMode(true)}>Edit Details</button>
//               <button
//                 onClick={deleteUserAccount}
//                 style={{ marginLeft: "10px" }}
//               >
//                 Delete Account
//               </button>
//             </div>
//           )}
//         </div>
//       ) : (
//         <p className="no-user">No user logged in or user account deleted.</p>
//       )}
//     </div>
//   );
// };

// export default Home;
