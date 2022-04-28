import React, { useEffect } from "react";
import { Button, Heading, Input, Text } from "@chakra-ui/react";
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

const validationSchema = {
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  startTime: Yup.number().required("Start time is required"),
  endTime: Yup.number().required("End time is required"),
};

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
        {({ errors, handleChange, values, isSubmitting, isValidating }) => (
          <Form>
            <Input
              mb={3}
              type="text"
              placeholder="Enter your name"
              name="name"
              isInvalid={errors.name != null}
              onChange={handleChange}
              value={values.name}
            />
            <ErrorMessage name="name" />

            <Input
              mb={3}
              type="email"
              placeholder="Enter your email"
              name="email"
              isInvalid={errors.email != null}
              onChange={handleChange}
              value={values.email}
            />
            <ErrorMessage name="email" />

            <Input
              mb={3}
              type="datetime-local"
              placeholder="Enter start time"
              name="startTime"
              isInvalid={errors.startTime != null}
              onChange={handleChange}
              value={values.startTime}
            />
            <ErrorMessage name="startTime" />

            <Input
              mb={3}
              type="datetime-local"
              placeholder="Enter end time"
              name="endTime"
              isInvalid={errors.endTime != null}
              onChange={handleChange}
              value={values.endTime}
            />
            <ErrorMessage name="endTime" />

            <Input hidden type="submit" />
            <Button
              colorScheme="blue"
              type="submit"
              disabled={isSubmitting || isValidating}
            >
              Reserve lab
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
