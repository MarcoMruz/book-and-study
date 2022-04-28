import { useAuth } from "@clerk/clerk-react";
import { useState, useEffect } from "react";

export function usePost(url: string) {
  const [ok, setOk] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const auth = useAuth();
  let execPost: ({
    method,
    body,
  }: {
    method?: "POST" | "DELETE";
    body: Record<string, any>;
  }) => void = () => {};

  useEffect(() => {
    const authenticatedFetch = async ({
      method = "POST",
      body,
    }: {
      method?: "POST" | "DELETE";
      body?: Record<string, any>;
    }) =>
      fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${await auth.getToken()}`,
          "Content-Type": "application/json",
        },
        ...(body && { body: JSON.stringify(body) }),
      })
        .then(() => setOk(true))
        .catch(() => setError(true));

    execPost = authenticatedFetch;
  }, [url]);

  return { ok, error, execPost };
}
