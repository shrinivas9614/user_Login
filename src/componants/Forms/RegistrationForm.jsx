import React from "react";
import { useState } from "react";
import axios from "axios";
import {
  Paper,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  TextareaAutosize,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
const RegistrationForm = () => {
  const handleCancel = (resetForm) => {
    resetForm(); // Reset the form values
  };
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    FullName: Yup.string().required("First Name is required"),
    Address: Yup.string().required("Last Name is required"),
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

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
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
            FullName: "",
            Address: "",
            email: "",
            createPassword: "",
            contactNumber: "",
            acceptTerms: false,
          }}
          validationSchema={schema}
          onSubmit={(values, { setSubmitting }) => {
            axios.post("/sign-up", values)
              .then(response => {
                console.log("Registration successful");
                setSubmitting(false);
              })
              .catch(error => {
                console.error("Registration failed", error);
                setSubmitting(false);
              });
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
                label="Full Name"
                variant="standard"
                name="FullName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.FullName}
                error={touched.FullName && !!errors.FullName}
                helperText={touched.FullName && errors.FullName}
              />
              <TextField
                required
                type="text"
                fullWidth
                id="filled-multiline-flexible"
                label="Address"
                multiline
                maxRows={4}
                variant="standard"
                name="Address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.Address}
                error={touched.Address && !!errors.Address}
                helperText={touched.Address && errors.Address}
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
