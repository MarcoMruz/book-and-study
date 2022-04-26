import React from "react";
import { SignUp } from "@clerk/clerk-react";

export function Register() {
  return <SignUp redirectUrl="/" signInUrl="/auth/login" />;
}
