const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

type CreateUserResponse = {
  id: string;
  name: string;
  created_at?: string;
};

export async function createUser(name: string) {
  const response = await fetch(`${API_BASE_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Unable to create user");
  }

  return (await response.json()) as CreateUserResponse;
}