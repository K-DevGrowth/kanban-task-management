const baseUrl = "/api/v1/columns";
const token = localStorage.getItem("token");

export const createTask = async (columnId, payload) => {
  const res = await fetch(`${baseUrl}/${columnId}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
};
