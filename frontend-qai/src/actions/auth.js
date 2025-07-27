const API_BASE = import.meta.env.VITE_API_BASE_URL;
const API_SIGNIN = import.meta.env.VITE_API_SIGNIN;
const API_SIGNUP = import.meta.env.VITE_API_SIGNUP;

async function handleResponse(res) {
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Request failed");
  return data;
}

export async function signIn(email, password) {
  const res = await fetch(`${API_BASE}${API_SIGNIN}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(res); // expects { token, user }
}

export async function signUp({ name, email, password }) {
  const res = await fetch(`${API_BASE}${API_SIGNUP}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password}),
  });
  return handleResponse(res); // expects { token, user }
}
