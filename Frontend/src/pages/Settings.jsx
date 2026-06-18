import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import MainLayout from "../components/Layout/MainLayout";
import { useTheme } from "../context/useTheme";
import { useNavigate } from "react-router-dom";

function Settings() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { theme } = useTheme();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteText, setDeleteText] = useState("");

  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      if (deleteText !== "DELETE") {
        toast.error("Type DELETE to continue");
        return;
      }

      const token = localStorage.getItem("token");

      const response = await api.delete("/users/delete-account", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      localStorage.clear();

      toast.success("Account deleted successfully");

      navigate("/");
    } catch (error) {
      console.log(error.response?.data);

      toast.error("Failed to delete account");
    }
  };

  const handleChangePassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      const token = localStorage.getItem("token");

      const response = await api.put(
        "/users/change-password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response.data);

      toast.success("Password updated successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setShowPasswordModal(false);
    } catch (error) {
      console.log(error.response?.data);

      toast.error(error.response?.data?.message || "Failed to update password");
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.put(
        "/users/profile",
        {
          name,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response.data);

      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success("Profile updated successfully");
      setShowProfileModal(false);
    } catch (error) {
      console.log(error.response?.data);

      toast.error("Failed to update profile");
    }
  };
  return (
    <MainLayout>
      <div className="settings-page">
        <h1>Settings</h1>

        <div className="settings-card">
          <h3>👤 Profile</h3>

          <p>Update your name and email</p>

          <button onClick={() => setShowProfileModal(true)}>
            Edit Profile
          </button>
        </div>

        <div className="settings-card">
          <h3>🔒 Change Password</h3>

          <p>Update your account password</p>

          <button onClick={() => setShowPasswordModal(true)}>
            Change Password
          </button>
        </div>

        <div className="settings-card">
          <h3>🎨 Theme</h3>

          <p>Current Theme: {theme}</p>

          <p>Theme controls are available in the sidebar.</p>
        </div>

        <div className="settings-card danger-card">
          <h3>⚠ Delete Account</h3>

          <p>Permanently delete your account and all data.</p>

          <button onClick={() => setShowDeleteModal(true)}>
            Delete Account
          </button>
        </div>

        {showPasswordModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Change Password</h2>

                <button onClick={() => setShowPasswordModal(false)}>✕</button>
              </div>

              <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />

              <br />
              <br />

              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <br />
              <br />

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <br />
              <br />

              <button onClick={handleChangePassword}>Update Password</button>
            </div>
          </div>
        )}
        {showProfileModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Edit Profile</h2>

                <button onClick={() => setShowProfileModal(false)}>✕</button>
              </div>

              <label>Name</label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <br />
              <br />

              <label>Email</label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <br />
              <br />

              <button onClick={handleUpdate}>Save Changes</button>
            </div>
          </div>
        )}
      </div>
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Delete Account</h2>

              <button onClick={() => setShowDeleteModal(false)}>✕</button>
            </div>

            <p>
              Type <strong>DELETE</strong> to confirm account deletion.
            </p>

            <input
              type="text"
              value={deleteText}
              onChange={(e) => setDeleteText(e.target.value)}
              placeholder="Type DELETE"
            />

            <br />
            <br />

            <button className="danger-btn" onClick={handleDeleteAccount}>
              Confirm Delete
            </button>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default Settings;
