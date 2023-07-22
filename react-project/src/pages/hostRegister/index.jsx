import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "../../assets/tourista.png";
import { callApi } from "../../api";
import { useState } from "react";
import _ from "lodash";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Tourista
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function HostRegister() {
  const [errorStates, setErrorStates] = useState({ name: "", email: "", phone: "", password: "" });
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (
      !data.get("firstName") ||
      !data.get("email") ||
      !data.get("password") ||
      !data.get("contact")
    ) {
      const tempErrorState = { name: "", email: "", phone: "", password: "" };
      if (!data.get("firstName")) {
        tempErrorState.name = "Please enter your name";
      }
      if (!data.get("contact")) {
        tempErrorState.phone = "Please enter your contact number";
      }
      if (!data.get("email")) {
        tempErrorState.email = "Please enter your email";
      }
      if (!data.get("password")) {
        tempErrorState.password = "Please enter your password";
      }
      setErrorStates(tempErrorState);
    } else {
      const obj = {
        name: data.get("firstName"),
        phone: data.get("contact"),
        email: data.get("email"),
        password: data.get("password"),
      };
      const tempErrorState = _.cloneDeep(errorStates);
      let test = false;
      if (data.get("email")) {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        test = data.get("email").match(validRegex);
        if (!test) {
          tempErrorState.email = "Please enter correct email";
        }
      }

      if (data.get("contact")) {
        test = data.get("contact").length === 10;
        if (!test) {
          tempErrorState.phone = "Please enter correct contact";
        }
      }
      if (test) {
        fetchData(obj);
      }
      setErrorStates(tempErrorState);
    }
  };

  const handleChange = (event) => {
    const tempErrorState = _.cloneDeep(errorStates);
    if (event.currentTarget.name === "firstName") {
      tempErrorState.name = "";
    }
    if (event.currentTarget.name === "email") {
      tempErrorState.email = "";
    }
    if (event.currentTarget.name === "password") {
      tempErrorState.password = "";
    }
    if (event.currentTarget.name === "contact") {
      tempErrorState.phone = "";
    }
    setErrorStates(tempErrorState);
  };

  const fetchData = async (data) => {
    try {
      const result = await callApi("/host/", "POST", data);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <img src={logo} alt="logo" width="150px" />
          {/* <Typography component="h1" variant="h5">
            Sign up
          </Typography> */}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleChange}
                  error={errorStates.name ? true : false}
                  helperText={errorStates.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="contact"
                  type="number"
                  required
                  fullWidth
                  id="contact"
                  label="Contact Number"
                  onChange={handleChange}
                  error={errorStates.phone ? true : false}
                  helperText={errorStates.phone}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  error={errorStates.email ? true : false}
                  helperText={errorStates.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handleChange}
                  autoComplete="new-password"
                  error={errorStates.password ? true : false}
                  helperText={errorStates.password}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive marketing, promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#1bb389", // Set the background color to purple
                color: "white", // Set the text color to white
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/host/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
