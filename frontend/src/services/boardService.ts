const baseUrl = "/api/v1/boards";
const token = localStorage.getItem("token");

export const getBoards = async () => {
  const response = await fetch(`${baseUrl}`, {
    method: "GET",
  });
  if (!response.ok) throw new Error("Failed to fetch boards");
  return response.json();
};

export const getBoard = async (boardId: string) => {
  const res = await fetch(`${baseUrl}/${boardId}`, {
    method: "GET",
  });
  if (!res.ok) throw new Error("Failed to fetch board");
  return res.json();
};

export const createBoard = async (payload) => {
  const res = await fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create board");
  return res.json();
};
