import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  HStack,
  IconButton,
  Progress,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useFetch } from "../../hooks/use-fetch";
import { apiUrl } from "../profile/me";

export function Labs() {
  const auth = useAuth();
  const { data, error, loading } = useFetch<{ labs: any[] }>(`${apiUrl}/labs`);
  const { data: user, error: userError } = useFetch<{
    user: { isTeacher: boolean };
  }>(`${apiUrl}/profile/me`);

  const deleteLab = async (labId: string) => {
    fetch(`${apiUrl}/delete-lab/${labId}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${await auth.getToken()}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        window.location.reload();
      }
    });
  };

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
            mb={5}
          >
            <HStack spacing={3}>
              <Heading size="lg">{lab.labName}</Heading>
              <Text>
                {lab.building} - {lab.floor} / {lab.labCapacity} seats
              </Text>
            </HStack>
            <Text color="gray.300">{lab.labDescription}</Text>
            <HStack>
              <Spacer />
              <ButtonGroup>
                {!userError && user?.user?.isTeacher && (
                  <>
                    <IconButton
                      aria-label="delete"
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      onClick={() => deleteLab(lab.id)}
                    />
                    <IconButton
                      aria-label="edit"
                      icon={<EditIcon />}
                      as={Link}
                      to={`/labs/${lab.id}/edit`}
                    />
                  </>
                )}
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
