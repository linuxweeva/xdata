"use client";

import { Input, Button } from "@/components/ui";
import { signIn } from "@/app/login/actions";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Login() {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const success = await signIn(formData);

    if (success) {
      router.push("/characters");
    } else {
      alert("There was an error authenticating");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        type="email"
        name="email"
        required
      />
      <Input
        label="Password"
        variant="outlined"
        fullWidth
        margin="normal"
        type="password"
        name="password"
        required
      />
      <Button variant="contained" size="large" fullWidth type="submit">
        Login
      </Button>
    </form>
  );
}
