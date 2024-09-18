import { redirect } from "next/navigation";

export async function signIn(formData: FormData) {
  const email = formData.get("email") ?? "";
  const password = formData.get("password") ?? "";

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    alert("An unexpected error occurred. Please try again.");
  }

  return false;
}
