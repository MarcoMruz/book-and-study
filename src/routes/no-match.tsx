import React from "react";
import { Container, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function NoMatch() {
  return (
    <Container centerContent>
      <Heading size="4xl" mb={5}>
        404
      </Heading>
      <Text>the page you are searching for does not exist anymore</Text>
      <Link to="/">
        <Button variant="link" mt={3}>
          Return home
        </Button>
      </Link>
    </Container>
  );
}
