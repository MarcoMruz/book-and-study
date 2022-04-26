import React from "react";
import { SignIn } from "@clerk/clerk-react";

export function Login() {
  return <SignIn redirectUrl="/" signUpUrl="/auth/register" />;
}
