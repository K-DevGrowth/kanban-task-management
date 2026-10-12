const baseUrl = "/api/v1/boards";

export const getBoardColumns = async (boardId: string) => {
  const res = await fetch(`${baseUrl}/${boardId}/columns`, {
    method: "GET",
  });
  if (!res.ok) throw new Error("Failed to fetch board");
  return res.json();
};

export const createBoard = async (payload) => {
  const res = await fetch(`${baseUrl}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create board");
  return res.json();
};
