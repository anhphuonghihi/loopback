import React, { useState, useEffect } from 'react'
import AuthContainer from './AuthContainer';
import Link from 'next/link'
import Typography from '@mui/material/Typography';
import { routes } from '../pages/routes';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { SignInInput } from '../redux/auth/interfaces';
import { signInStart } from '../redux/auth/actions';
import { AppState } from '../redux/root-reducer';
import { Box } from "@mui/material";
type Props = {}
import { useRouter } from 'next/router'
const SignIn = (props: Props) => {
  const { loading, viewer } = useSelector((state: AppState) => state.auth);
  const { signInErrors } = useSelector((state: AppState) => state.auth);
  const router = useRouter()
  const dispatch = useDispatch();
  const [emailErrText, setemailErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setemailErrText("");
    setPasswordErrText("");

    const data: any = new FormData(e.target);
    const email = data.get("email").trim();
    const password = data.get("password").trim();

    let err = false;

    if (email === "") {
      err = true;
      setemailErrText("Please fill this field");
    }
    if (password === "") {
      err = true;
      setPasswordErrText("Please fill this field");
    }
    if (err) return;
    const signInInput: any = { email, password };
    if (email !== "" && password !== "") {
      dispatch(signInStart(signInInput))
    }
    if (viewer) {
      router.push("/student");
    }
  };


  return (
    <div>            <Typography variant="h4" component="h1" textAlign={'center'}>
      Sign In
    </Typography>
      <AuthContainer>
        <Box component="form" onSubmit={(e: any) => handleSubmit(e)} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            disabled={loading}
            error={emailErrText !== ""}
            helperText={emailErrText}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="password"
            id="password"
            label="Password"
            name="password"
            disabled={loading}
            error={passwordErrText !== ""}
            helperText={passwordErrText}
          />
          <LoadingButton
            variant="outlined"
            fullWidth
            color="success"
            type="submit"
            loading={loading}
          >
            Login
          </LoadingButton>
        </Box>
        <Link href={routes.authSignup}>{"Don't have an account? Sign Up"}</Link>
      </AuthContainer>
    </div>
  )
}

export default SignIn