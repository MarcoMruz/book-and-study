import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  HStack,
  Progress,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "@clerk/clerk-react";
import dayjs from "dayjs";
import { apiUrl } from ".";
import { useFetch } from "../../../hooks/use-fetch";

export function MyReservations() {
  const auth = useAuth();
  const { data, error, loading } = useFetch<{ reservations: any[] }>(
    `${apiUrl}/reservations/me`
  );
  const [currentKey, setCurrentKey] = React.useState(null);

  const handleCancellationOfReservation = async (reservationId: string) => {
    const response = await fetch(
      `${apiUrl}/cancel-reservation/${reservationId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await auth.getToken()}`,
        },
      }
    );

    if (response.ok) {
      window.location.reload();
    }
  };

  if (loading) {
    return <Progress isIndeterminate />;
  }

  if (error || !data) {
    return <Text>There was a problem to load your reservations</Text>;
  }

  return (
    <>
      <HStack mb={5}>
        <Heading size="lg">Your reservations</Heading>
        <Spacer />
        <Button as={Link} to="/labs" colorScheme="blue">
          Reserve a lab
        </Button>
      </HStack>
      {data.reservations.length > 0 &&
        data.reservations.map((reservation: any) => (
          <Box
            onClick={() => {
              if (currentKey === reservation.id) {
                setCurrentKey(null);
              } else {
                setCurrentKey(reservation.id);
              }
            }}
            key={reservation.id}
            width="full"
            border="1px"
            boxShadow="lg"
            mb={5}
            rounded="lg"
            borderColor="gray.100"
            px={6}
            py={4}
          >
            <HStack
              flexDirection={["column", "column", "row"]}
              alignItems={["start", "start", "center"]}
              spacing={[0, 0, 1]}
            >
              <Stack>
                <Heading size="md">{reservation.name}</Heading>
                <HStack
                  flexDirection={["column", "column", "row"]}
                  alignItems={["start", "start", "center"]}
                  spacing={[0, 0, 1]}
                >
                  <Text>Reservation time: </Text>
                  <HStack>
                    <Text color="gray.300">
                      {dayjs(reservation.startTime).format("DD/MM/YYYY")}
                    </Text>
                    <Text color="gray.300">-</Text>
                    <Text color="gray.300">
                      {dayjs(reservation.endTime).format("DD/MM/YYYY")}
                    </Text>
                  </HStack>
                </HStack>
              </Stack>
              <Spacer />
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleCancellationOfReservation(reservation.id);
                }}
                width={["full", "full", "auto"]}
                colorScheme="red"
              >
                Cancel reservation
              </Button>
            </HStack>
            <Box hidden={currentKey !== reservation.id} mt={5}>
              <Heading size="md">
                {reservation.lab.labName} {`(${reservation.lab.labNumber})`}
              </Heading>
              <Text color="gray.300">{reservation.lab.labDescription}</Text>
              <Text>
                Location: {reservation.lab.building} - floor{" "}
                {reservation.lab.floor}
              </Text>
            </Box>
          </Box>
        ))}

      {data.reservations.length === 0 && (
        <HStack>
          <Text>You have no reservations</Text>
          <Spacer />
          <Button as={Link} to="/labs">
            Create one
          </Button>
        </HStack>
      )}
    </>
  );
}
