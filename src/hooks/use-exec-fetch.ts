import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";

export function useExecFetch(url: string) {
  const [ok, setOk] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const auth = useAuth();
  let execFetch: ({
    method,
    body,
  }: {
    method?: "POST" | "DELETE" | "GET";
    body: Record<string, any>;
  }) => void = () => {};

  const authenticatedFetch = async ({
    method = "POST",
    body,
  }: {
    method?: "POST" | "DELETE" | "GET";
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
      .then((res) => {
        if (!res.ok) {
          setError(true);
        } else {
          setOk(true);
        }
      })
      .catch(() => setError(true));

  execFetch = authenticatedFetch;

  return { ok, error, execFetch };
}
