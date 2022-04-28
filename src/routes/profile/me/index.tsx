import React from "react";
import {
  Avatar,
  Box,
  Button,
  Heading,
  HStack,
  Progress,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
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
  const auth = useAuth();

  const register = async () => {
    fetch(`${apiUrl}/register-isic`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${await auth.getToken()}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };

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
        <Spacer />
        <Button onClick={register} colorScheme="blue">
          Register
        </Button>
      </HStack>
      <Outlet />
    </>
  );
}
