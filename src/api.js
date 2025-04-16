// src/api.js
export const fetchScreenshots = async () => {
  const response = await fetch("http://localhost:5001/api/screenshots", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch screenshots");
  }

  return response.json();
};

export const deleteScreenshot = async (fileId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:5001/api/screenshots/${fileId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error("Failed to delete screenshot");
  }
  return response.json();
};

export const sendScreenshot = async (username, screenshotPath) => {
  const formData = new FormData();
  formData.append("username", username);
  const token = localStorage.getItem("token");

  try {
    const fileData = await window.electronAPI.fs.readFile(screenshotPath);
    formData.append("screenshot", new Blob([fileData], { type: "image/jpeg" }));

    const response = await fetch("http://localhost:5001/api/screenshots", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to save screenshot");
    }

    return response.json();
  } catch (error) {
    console.error("Error processing screenshot:", error.message);
    throw error;
  }
};

// New profile API functions
export const fetchUserProfile = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:5001/api/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }

  return response.json();
};

export const updateUserProfile = async (profileData) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  
  // Add display name if provided
  if (profileData.displayName) {
    formData.append("displayName", profileData.displayName);
  }
  
  // Add profile image if provided
  if (profileData.profileImage && profileData.profileImage instanceof File) {
    formData.append("profileImage", profileData.profileImage);
  }
  
  const response = await fetch("http://localhost:5001/api/profile", {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  return response.json();
};