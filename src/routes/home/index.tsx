import React from "react";
import { Heading } from "@chakra-ui/react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

export function Home() {
  return (
    <>
      <SignedIn>
        <Heading>Logged in</Heading>
      </SignedIn>
      <SignedOut>
        <Heading>Not logged in</Heading>
      </SignedOut>
    </>
  );
}
