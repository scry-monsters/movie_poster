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
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import Navbar from "../../../Navbar/Navbar";
import LoginIcon from "../../../../assets/icons/login.png";
import Footer from "../../../Footer/Footer"


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


export default function ForgotPasswordSecondPage() {
    const classes = useStyles();
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const history = useHistory();

    const changePassword = async (password, token) => {
        await axios
            .post("http://35.234.80.217/api/v1/accounts/password_reset/confirm/", {
                password, token
            })
            .then(console.log(password, token));
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
                    <Typography component="h1" variant="h5" style={{ color: "white" }}>
                        Confirm Password
                    </Typography>
                    <form
                        className={classes.form}
                        noValidate
                        onSubmit={(e) => {
                            e.preventDefault();
                            changePassword(password, token);
                            history.push('/');
                        }}
                        style={{ backgroundColor: "white", borderRadius: "10px" }}
                    >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="New Password"
                            name="password"
                            autoComplete="password"
                            autoFocus
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="token"
                            label="Token Address"
                            name="token"
                            autoComplete="token"
                            autoFocus
                            onChange={(e) => {
                                setToken(e.target.value);
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
                            Reset Password
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to="/signUpServer">Don't have an account? Sign Up</Link>
                            </Grid>
                            <Grid item>
                                <Link to="/signInServer">Already have an account? Sign In</Link>
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
