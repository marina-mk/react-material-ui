import React from "react";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: 10,
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%",
    marginTop: 10
  },
  submit: {
    margin: "20px 0"
  }
}));

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const LoginForm = ({ submitAuthData }) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik
          initialValues={{ email: '', password: '', remember: false }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required('Email is required'),
            password: Yup.string().required('Password is required'),
          })}
          onSubmit={(values, { resetForm }) => {
            submitAuthData(values);
            resetForm();
          }}
          render={({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <TextField
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email && touched.email}
                helperText={(errors.email && touched.email) && errors.email}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
              />
              <TextField
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password && touched.password}
                helperText={(errors.password && touched.password) && errors.password}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox
                  name="remember"
                  checked={values.remember}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  color="primary"
                  />}
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
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          )}
        />
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

LoginForm.propTypes = {
  submitAuthData: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(LoginForm);
