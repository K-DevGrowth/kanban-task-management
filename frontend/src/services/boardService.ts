const baseUrl = "/api/v1/boards";

export const getBoards = async () => {
  const response = await fetch(`${baseUrl}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch boards");
  }
  
  return response.json();
};
