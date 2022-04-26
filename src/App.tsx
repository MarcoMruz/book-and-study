import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Button, HStack } from "@chakra-ui/react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Home } from "./routes/home";
import { About } from "./routes/about";
import { Login } from "./routes/auth/login";
import { Register } from "./routes/auth/register";

function App() {
  return (
    <>
      <HStack>
        <Link to="/">Book &amp; Study</Link>
        <SignedIn>
          <UserButton
            showName
            userProfileUrl="/profile/me"
            afterSignOutUrl="/"
          />
        </SignedIn>
        <SignedOut>
          <Button as={Link} to="/auth/login">
            Sign in
          </Button>
          <Button as={Link} to="/auth/register">
            Sign up
          </Button>
        </SignedOut>
      </HStack>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
