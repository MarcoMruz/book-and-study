import React from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  Progress,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/use-fetch";
import { apiUrl } from "../profile/me";

export function Labs() {
  const { data, error, loading } = useFetch<{ labs: any[] }>(`${apiUrl}/labs`);

  if (loading) {
    return <Progress />;
  }

  if (error || !data) {
    return <Text>There was a problem to load your labs</Text>;
  }

  return (
    <>
      {data.labs.length === 0 && (
        <HStack>
          <Text>You have no labs</Text>
          <Spacer />
          <Button as={Link} to="/labs/create" colorScheme="blue">
            Create one
          </Button>
        </HStack>
      )}

      {data.labs.length > 0 &&
        data.labs.map((lab) => (
          <Box key={lab.id}>
            <Heading>{lab.name}</Heading>
            <Button as={Link} to={`/labs/${lab.id}/free-slots`}>
              See free slots
            </Button>
            <Button as={Link} to={`/labs/${lab.id}/reserve`} colorScheme="blue">
              Reserve lab
            </Button>
          </Box>
        ))}
    </>
  );
}
