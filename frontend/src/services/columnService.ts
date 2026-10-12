const baseUrl = "/api/v1/boards";
const token = localStorage.getItem("token");

export const createColumn = async (boardId, payload) => {
  const res = await fetch(`${baseUrl}/${boardId}/columns`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create column");
  return res.json();
};
