export const login = async (payload) => {
  const res = await fetch("/api/v1/auth/sign-in", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to login");
  const json = await res.json();

  localStorage.setItem("token", json.data.token);

  return json.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};
