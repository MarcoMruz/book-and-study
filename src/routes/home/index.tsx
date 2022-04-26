import React from "react";
import { Button, Heading, HStack } from "@chakra-ui/react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <>
      <HStack>
        <Button as={Link} to="/auth/login">
          Sign in
        </Button>
        <Button as={Link} to="/auth/register">
          Sign up
        </Button>
      </HStack>
      <SignedIn>
        <Heading>Logged in</Heading>
      </SignedIn>
      <SignedOut>
        <Heading>Not logged in</Heading>
      </SignedOut>
    </>
  );
}
