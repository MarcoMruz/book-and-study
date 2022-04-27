import { useAuth } from "@clerk/clerk-react";
import { useState, useEffect } from "react";

type FetchOptions = {
  method?: string;
  body?: any;
};

export function useFetch<T>(
  url: string,
  options: FetchOptions = { method: "GET" }
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (url.trim().length === 0) {
          throw new Error("URL is required");
        }
        const authenticatedFetch = async () =>
          fetch(url, {
            method: options.method,
            body: options.body,
            headers: {
              Authorization: `Bearer ${await auth.getToken()}`,
              Cookie: document.cookie,
              "Content-Type": "application/json",
            },
            credentials: "include",
            mode: "cors",
          }).then((res) => res.json());

        const response = await authenticatedFetch();
        setData(response);
      } catch {
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
}
