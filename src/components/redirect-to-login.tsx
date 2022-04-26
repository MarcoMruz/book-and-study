import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function RedirectToSignIn() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/profile/me", { replace: true });
    } else {
      navigate("/auth/login", { replace: true });
    }
  }, []);

  return null;
}
