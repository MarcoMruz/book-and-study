import { useAuth } from "@clerk/clerk-react";
import { useState, useEffect } from "react";

export function useFetch<T>(url: string) {
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
            method: "GET",
            headers: {
              Authorization: `Bearer ${await auth.getToken()}`,
              "Content-Type": "application/json",
            },
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
