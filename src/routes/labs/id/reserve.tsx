import React, { useEffect } from "react";
import {
  Button,
  FormErrorMessage,
  Heading,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import { Form, useFormik } from "formik";
import * as Yup from "yup";
import { useUser } from "@clerk/clerk-react";
import { useParams, useNavigate } from "react-router-dom";
import { usePost } from "../../../hooks/use-post";
import { apiUrl } from "../../profile/me";

const initialValues = {
  name: "",
  email: "",
  startTime: Date.now(),
  endTime: Date.now(),
  labId: "",
  userId: "",
};

const validationSchema = {
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  startTime: Yup.number().required("Start time is required"),
  endTime: Yup.number().required("End time is required"),
};

export function ReserveLab() {
  const navigate = useNavigate();
  const { labId } = useParams();
  const { user } = useUser();
  const { execPost, error, ok } = usePost(`${apiUrl}/${labId}/reserve-lab`);

  const { handleChange, values, handleSubmit, errors } = useFormik({
    validationSchema,
    initialValues,
    onSubmit: (formValues) => {
      execPost(
        JSON.stringify({
          ...formValues,
          labId,
          userId: user?.id,
        })
      );
    },
  });

  useEffect(() => {
    if (ok) {
      navigate("/profile/me/reservations");
    }
  }, [ok, error]);

  return (
    <>
      <Heading size="md">Reservation form</Heading>
      {error && <Text>We could not create </Text>}
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            placeholder="Enter your name"
            name="name"
            isInvalid={errors.name != null}
            onChange={handleChange}
            value={values.name}
          />
          <FormErrorMessage>{errors.name}</FormErrorMessage>
        </InputGroup>

        <InputGroup>
          <Input
            type="email"
            placeholder="Enter your email"
            name="email"
            isInvalid={errors.email != null}
            onChange={handleChange}
            value={values.email}
          />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </InputGroup>

        <InputGroup>
          <Input
            type="datetime-local"
            placeholder="Enter start time"
            name="startTime"
            isInvalid={errors.startTime != null}
            onChange={handleChange}
            value={values.startTime}
          />
          <FormErrorMessage>{errors.startTime}</FormErrorMessage>
        </InputGroup>

        <InputGroup>
          <Input
            type="datetime-local"
            placeholder="Enter end time"
            name="endTime"
            isInvalid={errors.endTime != null}
            onChange={handleChange}
            value={values.endTime}
          />
          <FormErrorMessage>{errors.endTime}</FormErrorMessage>
        </InputGroup>

        <Input hidden type="submit" />
        <Button colorScheme="blue" type="submit">
          Reserve lab
        </Button>
      </Form>
    </>
  );
}
