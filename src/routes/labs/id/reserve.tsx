import React, { useEffect } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
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

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  startTime: Yup.number().required("Start time is required"),
  endTime: Yup.number().required("End time is required"),
});

export function ReserveLab() {
  const navigate = useNavigate();
  const { labId } = useParams();
  const { execPost, error, ok } = usePost(`${apiUrl}/${labId}/reserve-lab`);

  useEffect(() => {
    if (ok) {
      navigate("/profile/me/reservations");
    }
  }, [ok, error]);

  return (
    <>
      <Heading size="lg" mb={5}>
        Reservation form
      </Heading>
      {error && <Text>We could not reserve lab for you :(</Text>}
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(formValues) => {
          execPost({
            body: {
              ...formValues,
            },
          });
        }}
      >
        {({
          errors,
          handleChange,
          values,
          isSubmitting,
          isValidating,
          resetForm,
        }) => (
          <Form>
            <Box mb={3}>
              <Input
                type="text"
                placeholder="Enter your name"
                name="name"
                isInvalid={errors.name != null}
                onChange={handleChange}
                value={values.name}
              />
              <ErrorMessage component={Text} name="name">
                {(msg) => <Text color="red">{msg}</Text>}
              </ErrorMessage>
            </Box>

            <Box mb={3}>
              <Input
                type="email"
                placeholder="Enter your email"
                name="email"
                isInvalid={errors.email != null}
                onChange={handleChange}
                value={values.email}
              />
              <ErrorMessage component={Text} name="email">
                {(msg) => <Text color="red">{msg}</Text>}
              </ErrorMessage>
            </Box>

            <Box mb={3}>
              <Input
                type="datetime-local"
                placeholder="Enter start time"
                name="startTime"
                isInvalid={errors.startTime != null}
                onChange={handleChange}
                value={values.startTime}
              />
              <ErrorMessage component={Text} name="startTime">
                {(msg) => <Text color="red">{msg}</Text>}
              </ErrorMessage>
            </Box>

            <Box mb={3}>
              <Input
                mb={3}
                type="datetime-local"
                placeholder="Enter end time"
                name="endTime"
                isInvalid={errors.endTime != null}
                onChange={handleChange}
                value={values.endTime}
              />
              <ErrorMessage component={Text} name="endTime">
                {(msg) => <Text color="red">{msg}</Text>}
              </ErrorMessage>
            </Box>

            <Input hidden type="submit" />
            <ButtonGroup float="right" mb={5}>
              <Button type="button" onClick={() => resetForm()}>
                Reset
              </Button>
              <Button
                colorScheme="blue"
                type="submit"
                disabled={isSubmitting || isValidating}
              >
                Reserve lab
              </Button>
            </ButtonGroup>
          </Form>
        )}
      </Formik>
    </>
  );
}
