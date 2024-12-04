export const fetchScreenshots = async () => {
  const response = await fetch("http://localhost:5001/api/screenshots", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch screenshots");
  }

  return response.json();
};

export const sendScreenshot = async (username, screenshotPath) => {
  const formData = new FormData();
  const token = localStorage.getItem("token");

  try {
    const fileData = await window.electronAPI.fs.readFile(screenshotPath);
    formData.append("username", username);
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
