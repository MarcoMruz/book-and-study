import { Progress, Text } from "@chakra-ui/react";
import React from "react";
import { useFetch } from "../hooks/use-fetch";
import { apiUrl } from "../routes/profile/me";

export function TeacherProtectedRoute({
  children,
}: React.PropsWithChildren<{}>) {
  const { data, loading, error } = useFetch<{ user: { isTeacher: boolean } }>(
    `${apiUrl}/profile/me`
  );

  if (loading) {
    return <Progress isIndeterminate />;
  }

  if (error || !data) {
    return <Text>We could not verify your role</Text>;
  }

  return data.user.isTeacher ? (
    <div>{children}</div>
  ) : (
    <Text>You are not allowed to do this</Text>
  );
}
