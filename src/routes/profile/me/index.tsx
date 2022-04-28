import React from "react";
import { Avatar, Box, Heading, HStack, Progress, Text } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { useFetch } from "../../../hooks/use-fetch";

type User = {
  user: {
    name: string;
    email: string;
    profileImage: string;
    isTeacher: boolean;
  };
};

export const apiUrl = process.env.REACT_APP_API_URL;

export function UserProfile() {
  const { data, loading, error } = useFetch<User>(`${apiUrl}/profile/me`);

  if (loading) {
    return <Progress isIndeterminate />;
  }

  if (error || !data) {
    return (
      <Heading>There was a problem to get the data from our server</Heading>
    );
  }

  return (
    <>
      <HStack spacing={5} mb={10}>
        <Avatar size="xl" src={data.user.profileImage} />
        <Box>
          <Heading>{data.user.name}</Heading>
          <Text>{data.user.email}</Text>
        </Box>
      </HStack>
      <Outlet />
    </>
  );
}
