import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Formik, Field, type FormikProps, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { registerUser } from "../AuthComponent/service";

interface FormValues {
  username: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [success, setSuccess] = useState("");
  
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    // Handle form submission
    const submit = await registerUser(values);
    console.log(submit.message);
    setSuccess(submit.message);
    setSubmitting(false);
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Create an account</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your details to get started.
        </p>
      </div>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }: FormikProps<FormValues>) => (
          <Form className="space-y-4" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Field type="text" name="name" as={Form.Control} />
              <Form.Control.Feedback type="invalid" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Field type="email" name="email" as={Form.Control} />
              <Form.Control.Feedback type="invalid" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Field type="password" name="password" as={Form.Control} />
              <Form.Control.Feedback type="invalid" />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-full">
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;