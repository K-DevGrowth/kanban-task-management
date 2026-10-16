const baseUrl = "/api/v1";
const token = localStorage.getItem("token");

export const createTask = async (columnId, payload) => {
  const res = await fetch(`${baseUrl}/columns/${columnId}/tasks`, {
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

export const moveTask = async (payload) => {
  const res = await fetch(`${baseUrl}/tasks/reorder`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to move task");
  return res.json();
};
