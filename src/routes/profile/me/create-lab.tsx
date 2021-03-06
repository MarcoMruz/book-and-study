import React, { useEffect } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useExecFetch } from "../../../hooks/use-exec-fetch";
import { apiUrl } from ".";

const initialValues = {
  labNumber: "",
  labName: "",
  labDescription: "",
  labCapacity: 0,
  building: "",
  floor: 0,
};

const validationSchema = Yup.object({
  labNumber: Yup.string().required("Lab number is required"),
  labName: Yup.string().required("Lab name is required"),
  labDescription: Yup.string().required("Lab description is required"),
  labCapacity: Yup.number().required("Lab capacity is required"),
  building: Yup.string().required("Building is required"),
  floor: Yup.number().required("Floor is required"),
});

export function CreateLab() {
  const navigate = useNavigate();
  const { execFetch, error, ok } = useExecFetch(`${apiUrl}/create-lab`);

  useEffect(() => {
    if (ok) {
      navigate("/profile/me/reservations");
    }
  }, [ok]);

  return (
    <>
      <Heading size="lg" mb={5}>
        Create lab form
      </Heading>
      {error && (
        <Text color="red">
          We could not create lab for you :( Try again please
        </Text>
      )}
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(formValues) => {
          execFetch({
            body: formValues,
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
          touched,
        }) => (
          <Form>
            <Box mb={3}>
              <Input
                type="text"
                placeholder="Enter name of lab"
                name="labName"
                isInvalid={touched.labName && errors.labName != null}
                onChange={handleChange}
                value={values.labName}
              />
              <ErrorMessage component={Text} name="labName">
                {(msg) => <Text color="red">{msg}</Text>}
              </ErrorMessage>
            </Box>

            <Box mb={3}>
              <Input
                type="text"
                placeholder="Enter number of lab"
                name="labNumber"
                isInvalid={touched.labNumber && errors.labNumber != null}
                onChange={handleChange}
                value={values.labNumber}
              />
              <ErrorMessage component={Text} name="labNumber">
                {(msg) => <Text color="red">{msg}</Text>}
              </ErrorMessage>
            </Box>

            <Box mb={3}>
              <Input
                type="number"
                placeholder="Enter capacity of lab"
                name="labCapacity"
                isInvalid={touched.labCapacity && errors.labCapacity != null}
                onChange={handleChange}
                value={values.labCapacity}
              />
              <ErrorMessage component={Text} name="labCapacity">
                {(msg) => <Text color="red">{msg}</Text>}
              </ErrorMessage>
            </Box>

            <Box mb={3}>
              <Input
                type="text"
                placeholder="Enter building in which is lab located"
                name="building"
                isInvalid={touched.building && errors.building != null}
                onChange={handleChange}
                value={values.building}
              />
              <ErrorMessage component={Text} name="building">
                {(msg) => <Text color="red">{msg}</Text>}
              </ErrorMessage>
            </Box>

            <Box mb={3}>
              <Input
                type="number"
                placeholder="Enter building on what floor is lab located"
                name="floor"
                isInvalid={touched.floor && errors.floor != null}
                onChange={handleChange}
                value={values.floor}
              />
              <ErrorMessage component={Text} name="floor">
                {(msg) => <Text color="red">{msg}</Text>}
              </ErrorMessage>
            </Box>

            <Box mb={3}>
              <Textarea
                placeholder="Enter description to better describe lab"
                name="labDescription"
                isInvalid={
                  touched.labDescription && errors.labDescription != null
                }
                onChange={handleChange}
                value={values.labDescription}
              />
              <ErrorMessage component={Text} name="labDescription">
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
                isLoading={isSubmitting || isValidating}
              >
                Create lab
              </Button>
            </ButtonGroup>
          </Form>
        )}
      </Formik>
    </>
  );
}
