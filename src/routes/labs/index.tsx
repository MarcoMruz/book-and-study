import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
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
          <Box
            key={lab.id}
            border="1px"
            borderColor="gray.100"
            rounded="lg"
            position="relative"
            boxShadow="md"
            px={6}
            py={4}
          >
            <HStack spacing={3}>
              <Heading size="lg">{lab.labName}</Heading>
              <Text>
                {lab.building} - {lab.floor} / {lab.labCapacity} seats
              </Text>
            </HStack>
            <Text>
              Owner: {lab.owner.name} - {lab.owner.email}
            </Text>
            <Text color="gray.300">{lab.labDescription}</Text>
            <HStack>
              <Spacer />
              <ButtonGroup>
                <Button as={Link} to={`/labs/${lab.id}/free-slots`}>
                  See free slots
                </Button>
                <Button
                  as={Link}
                  to={`/labs/${lab.id}/reserve`}
                  colorScheme="blue"
                >
                  Reserve lab
                </Button>
              </ButtonGroup>
            </HStack>
          </Box>
        ))}
    </>
  );
}
