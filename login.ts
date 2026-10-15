interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
}

export async function login(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error(
      response.status === 401
        ? "Invalid email or password."
        : `Login failed (${response.status}).`,
    );
  }

  const result: unknown = await response.json();
  if (
    typeof result !== "object" ||
    result === null ||
    !("accessToken" in result) ||
    typeof result.accessToken !== "string"
  ) {
    throw new Error("The login server returned an invalid response.");
  }

  return { accessToken: result.accessToken };
}
