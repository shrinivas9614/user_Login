import React from "react";
import { useState } from "react";
import {
  Paper,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";

const RegistrationForm = () => {
  const handleCancel = (resetForm) => {
    resetForm(); // Reset the form values
  };
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    createPassword: Yup.string()
      .matches(
        /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*?&])[A-Za-z0-9\d@$!%*?&]{8,}$/,
        "Password must contain at least one number, one letter, and one special symbol"
      )
      .required("Password is required"),
    contactNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "contact number must be a 10 digits")
      .required(" Contact number is required"),
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: "50px 50px ",
          width: 300,
          background: "rgba(255,255,255,0.3)",
        }}
      >
        <Grid align="center">
          <Typography variant="h4" fontSize="small">
            Sign Up
          </Typography>
          <Typography varient="caption">Create your account</Typography>
        </Grid>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            createPassword: "",
            contactNumber: "",
            acceptTerms: false,
          }}
          validationSchema={schema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            resetForm,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                required
                type="text"
                fullWidth
                label="First Name"
                variant="standard"
                name="firstName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                error={touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
              />
              <TextField
                required
                type="text"
                fullWidth
                label="Last Name"
                variant="standard"
                name="lastName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
                error={touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
              />
              <TextField
                required
                fullWidth
                type="email"
                label="Email Id"
                variant="standard"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />
              <TextField
                required
                fullWidth
                type={showPassword ? "text" : "password"} // Toggle password visibility
                label="Create Password"
                variant="standard"
                name="createPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.createPassword}
                error={touched.createPassword && !!errors.createPassword}
                helperText={touched.createPassword && errors.createPassword}
                InputProps={{
                  endAdornment: (
                    <Button
                      onClick={togglePasswordVisibility}
                      size="small"
                      style={{ textTransform: "none" }}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  ),
                }}
              />
              <TextField
                required
                fullWidth
                type="number"
                label="contact number"
                variant="standard"
                name="contactNumber"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.contactNumber}
                error={touched.contactNumber && !!errors.contactNumber}
                helperText={touched.contactNumber && errors.contactNumber}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={values.acceptTerms}
                    onChange={() =>
                      setFieldValue("acceptTerms", !values.acceptTerms)
                    }
                  />
                }
                label="Accept the terms and conditions"
              />
              <Grid container spacing={2}>
                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    Sign Up
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    type="button" // Change type to "button"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={() => handleCancel(resetForm)} // Call handleCancel with resetForm
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Paper>
    </div>
  );
};

export default RegistrationForm;
