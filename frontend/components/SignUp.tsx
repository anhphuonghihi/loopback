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
import { signUpStart } from '../redux/auth/actions';
import { AppState } from '../redux/root-reducer';
import { Box } from "@mui/material";
type Props = {}
import { useRouter } from 'next/router'
const SignUp = (props: Props) => {
    const { loading, viewer } = useSelector((state: AppState) => state.auth);
    const { signUpErrors } = useSelector((state: AppState) => state.auth);
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
        const signUpInput: any = { email, password };
        if (email !== "" && password !== "") {
            dispatch(signUpStart(signUpInput))
        }
        if (viewer.id) {
            router.push(routes.authSignin);
        }
    };


    return (
        <div>            <Typography variant="h4" component="h1" textAlign={'center'}>
            Sign Up
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
                        Register
                    </LoadingButton>
                </Box>
                <Link href={routes.authSignin}>{"Already have an account? Sign in"}</Link>
            </AuthContainer>
        </div>
    )
}

export default SignUp