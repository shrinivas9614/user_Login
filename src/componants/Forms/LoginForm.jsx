import React from "react";
import {
  Paper,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  FormGroup,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";



const LogninForm = () => {
  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),

    createPassword: Yup.string()
    .matches( /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*?&])[A-Za-z0-9\d@$!%*?&]{8,}$/,
    "Password must contain at least one number, one letter, and one special symbol"
  ).required("Password is required")
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
            Login 
          </Typography>
          <Typography varient="caption">Login With Email And Password</Typography>
        </Grid>

        <Formik
          initialValues={{
            email: "",
            createPassword: "",
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
          }) => (
            <Grid>
              <form onSubmit={handleSubmit}>
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
                <FormGroup>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    label="Passwprd"
                    variant="standard"
                    name="createPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.createPassword}
                    error={touched.createPassword && !!errors.createPassword}
                    helperText={touched.createPassword && errors.createPassword}
                  />
                </FormGroup>

                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Remember Me"
                />
              </form>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Sign Up
              </Button>
            </Grid>
          )}
        </Formik>
      </Paper>
    </div>
  );
};

export default LogninForm;
