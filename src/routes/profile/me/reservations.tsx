import React from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Button,
  Heading,
  HStack,
  Progress,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { apiUrl } from ".";
import { useFetch } from "../../../hooks/use-fetch";

export function MyReservations() {
  const { data, error, loading } = useFetch<{ reservations: any[] }>(
    `${apiUrl}/reservations/me`
  );

  const handleCancellationOfReservation = async (reservationId: string) => {
    const response = await fetch(
      `${apiUrl}/cancel-reservations/${reservationId}`,
      {
        method: "DELETE",
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
      <HStack>
        <Heading size="lg" mb={5}>
          Your reservations
        </Heading>
        <Spacer />
        <Button as={Link} to="/labs" colorScheme="blue">
          Reserve a lab
        </Button>
      </HStack>
      <HStack>
        {data.reservations.length > 0 &&
          data.reservations.map((reservation: any) => (
            <Accordion
              allowMultiple
              key={reservation.id}
              width="full"
              border="1px"
              boxShadow="lg"
              mb={5}
              rounded="lg"
              borderColor="gray.100"
            >
              <AccordionItem border="none">
                <AccordionButton
                  as={HStack}
                  alignItems="start"
                  justifyContent="space-between"
                  justifyItems="center"
                  px={6}
                  py={4}
                  rounded="lg"
                >
                  <Stack>
                    <Heading size="md">{reservation.name}</Heading>
                    <HStack>
                      <Text>Reservation time: </Text>
                      <Text color="gray.300">
                        {dayjs(reservation.startTime).format("DD/MM/YYYY")}
                      </Text>
                      <Text color="gray.300">-</Text>
                      <Text color="gray.300">
                        {dayjs(reservation.endTime).format("DD/MM/YYYY")}
                      </Text>
                    </HStack>
                  </Stack>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      handleCancellationOfReservation(reservation.id);
                    }}
                    colorScheme="red"
                  >
                    Cancel reservation
                  </Button>
                </AccordionButton>
                <AccordionPanel>
                  <Heading size="md">
                    {reservation.lab.labName} {`(${reservation.lab.labNumber})`}
                  </Heading>
                  <Text color="gray.300">{reservation.lab.labDescription}</Text>
                  <Text>
                    Location: {reservation.lab.building} - floor{" "}
                    {reservation.lab.floor}
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          ))}

        {data.reservations.length === 0 && (
          <HStack>
            <Text>You have no reservations</Text>
            <Spacer />
            <Button as={Link} to="/profile/me/reserve-lab">
              Create one
            </Button>
          </HStack>
        )}
      </HStack>
    </>
  );
}
