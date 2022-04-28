import { useAuth } from "@clerk/clerk-react";
import { useState, useEffect } from "react";

export function usePost(url: string) {
  const [ok, setOk] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const auth = useAuth();
  let execPost: (body: string) => void = () => {};

  useEffect(() => {
    const authenticatedFetch = async (body: string) =>
      fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await auth.getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then(() => setOk(true))
        .catch(() => setError(true));

    execPost = authenticatedFetch;
  }, [url]);

  return { ok, error, execPost };
}
