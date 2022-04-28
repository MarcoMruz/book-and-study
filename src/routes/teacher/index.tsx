import React, { useState } from "react";
import { Select, Button, Heading, Progress, Text } from "@chakra-ui/react";

import { Link, Outlet } from "react-router-dom";
import { apiUrl } from "../profile/me";
import { useFetch } from "../../hooks/use-fetch";

export function Teachers() {
  const [teacherId, setTeacherId] = useState<string | null>(null);

  const { data, error, loading } = useFetch<{ teachers: any[] }>(
    `${apiUrl}/teachers`
  );

  if (loading) {
    return <Progress isIndeterminate />;
  }

  if (error || !data) {
    return <Text>There was a problem to load your labs</Text>;
  }

  if (data) {
    // eslint-disable-next-line no-console
    console.log(data);
  }

  return (
    <div>
      <Heading>Find a teacher.</Heading>

      <br />

      <Select
        placeholder="Select option"
        onChange={(e) => setTeacherId(e.target.value)}
      >
        {data.teachers.map((teacher) => (
          <option value={teacher.id} key={teacher.id}>
            {teacher.name}
          </option>
        ))}
      </Select>

      <div style={{marginTop: 10}}>
          <Button colorScheme="blue" as={Link} to={`/teacher/${teacherId}`}>
            Find
          </Button>
      </div>

      <Outlet />
    </div>
  );
}
