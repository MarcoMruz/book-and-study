import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import tuke_building from "../../assets/tuke_building.webp";
// import { Heading } from "@chakra-ui/react";
// import { SignedIn, SignedOut } from "@clerk/clerk-react";

export function Home() {
  return (
    <Box
      bgImage={`url(${tuke_building})`}
      h="87vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Heading as="h1" size="4xl" color="white" textShadow="lg">
        Book & Study
      </Heading>
    </Box>
  );
}
