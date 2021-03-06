import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Footer from "../../../Footer/Footer"
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import Navbar from "../../../Navbar/Navbar";
import LoginIcon from "../../../../assets/icons/login.png";
import { notifySuccess } from "../../../../helpers/notifiers";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Movie Poster
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const addUser = async (email, password) => {
    const data = await axios
      .post("http://35.234.80.217/api/v1/accounts/login/", {
        email,
        password,
      })
      .then((response) => {
        console.log(response);
        if (response.data.access) {
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log(response.data);
        }

        return response.data;
      });
    console.log(data);
    notifySuccess("Вы успешно зашли!");
    history.push("/");
  };

  const refreshToken = async () => {
    // console.log(JSON.parse(`${localStorage.getItem("user")}`));
    const getRefresh = JSON.parse(`${localStorage.getItem("user")}`);
    // console.log(getRefresh)
    const strRefresh = JSON.stringify(getRefresh.refresh);
    console.log(strRefresh);

    const headers = {
      "Content-Type": "application/json",
      data: { refresh: strRefresh },
    };
    const data = await axios.post(
      "http://7b4c8012f3f6.ngrok.io/api/v1/token/refresh/",
      headers
    );
    console.log(data);
    return data;
  };

  const logOut = () => {
    localStorage.removeItem("user");
  };

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <img src={LoginIcon} alt="login" />
          </Avatar>
          <Typography style={{ color: "white" }} component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              addUser(email, password);
            }}
            style={{ backgroundColor: "white", borderRadius: "10px" }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forgotPasswordServer">Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link to="/signUpServer">Don't have an account? Sign Up</Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
      <Footer />
    </>
  );
}
