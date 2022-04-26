import React from "react";
import { Box, Container, HStack, Spacer, Button } from "@chakra-ui/react";
import { SignedIn, UserButton, SignedOut } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <Box p={3} boxShadow="lg" mb={5}>
      <Container maxW="5xl">
        <HStack>
          <Link to="/">Book &amp; Study</Link>
          <Spacer />
          <SignedIn>
            <UserButton userProfileUrl="/profile/account" afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Button as={Link} to="/auth/login">
              Sign in
            </Button>
            <Button as={Link} to="/auth/register" colorScheme="blue">
              Sign up
            </Button>
          </SignedOut>
        </HStack>
      </Container>
    </Box>
  );
}
