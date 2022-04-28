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
import { useNavigate, useParams } from "react-router-dom";
import { useExecFetch } from "../../../hooks/use-exec-fetch";
import { apiUrl } from "../../profile/me";

const initialValues = {
  name: "",
  email: "",
  startTime: "",
  endTime: "",
  labId: "",
  userId: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  startTime: Yup.string().required("Start time is required"),
  endTime: Yup.string().required("End time is required"),
});

export function ReserveLab() {
  const navigate = useNavigate();
  const { labId } = useParams();
  const { execFetch, error, ok } = useExecFetch(
    `${apiUrl}/reserve-lab/${labId}`
  );

  useEffect(() => {
    if (!error) {
      navigate("/profile/me/reservations");
    }
  }, [ok, error]);

  const minValueOfDate = new Date().toISOString();

  return (
    <>
      <Heading size="lg" mb={5}>
        Reservation form
      </Heading>
      {error && (
        <Text color="red">
          We could not reserve lab for you :( Try again please
        </Text>
      )}
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(formValues) => {
          execFetch({
            body: {
              name: formValues.name,
              email: formValues.email,
              startTime: new Date(formValues.startTime),
              endTime: new Date(formValues.endTime),
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
                min={minValueOfDate}
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
                min={values.startTime || minValueOfDate}
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
