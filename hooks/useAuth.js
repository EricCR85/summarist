import { useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);

  const signOut = () => {
    setUser(null);
  }

 const login = () => {
    setUser({ name: "User" });
  }

  return { user, signOut, login };
}
    