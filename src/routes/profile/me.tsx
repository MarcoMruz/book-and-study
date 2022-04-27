import React from "react";
import { Heading, Progress } from "@chakra-ui/react";
import { useFetch } from "../../hooks/use-fetch";

export function UserProfile() {
  const { data, loading, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/profile/me`
  );

  if (loading) {
    return <Progress isIndeterminate />;
  }

  if (error || !data) {
    return (
      <Heading>There was a problem to get the data from our server</Heading>
    );
  }

  return <Heading>UserProfile</Heading>;
}
