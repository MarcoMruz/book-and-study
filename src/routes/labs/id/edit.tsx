import React, { useEffect } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  HStack,
  IconButton,
  Input,
  Progress,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CloseIcon } from "@chakra-ui/icons";
import { useExecFetch } from "../../../hooks/use-exec-fetch";
import { apiUrl } from "../../profile/me";
import { useFetch } from "../../../hooks/use-fetch";

const validationSchema = Yup.object({
  labNumber: Yup.string().required("Lab number is required"),
  labName: Yup.string().required("Lab name is required"),
  labDescription: Yup.string().required("Lab description is required"),
  labCapacity: Yup.number().required("Lab capacity is required"),
});

export function EditLab() {
  const navigate = useNavigate();
  const { labId } = useParams();
  const {
    data,
    error: labError,
    loading,
  } = useFetch<{ lab: any }>(`${apiUrl}/labs/${labId}`);
  const { execFetch, error, ok } = useExecFetch(`${apiUrl}/edit-lab/${labId}`);

  useEffect(() => {
    if (ok) {
      navigate("/labs");
    }
  }, [ok]);

  if (loading) {
    return <Progress isIndeterminate />;
  }

  if (labError || !data) {
    return <Text color="red">There was problem to load lab</Text>;
  }

  const initialValues = {
    labNumber: data.lab.labNumber,
    labName: data.lab.labName,
    labDescription: data.lab.labDescription,
    labCapacity: data.lab.labCapacity,
  };

  return (
    <>
      <HStack mb={5}>
        <IconButton
          icon={<CloseIcon />}
          aria-label="back"
          as={Link}
          to="/labs"
          variant="ghost"
        />
        <Heading size="lg">Edit lab</Heading>
      </HStack>
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
                Edit lab
              </Button>
            </ButtonGroup>
          </Form>
        )}
      </Formik>
    </>
  );
}
