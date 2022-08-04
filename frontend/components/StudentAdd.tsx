import React, { useState, useEffect } from 'react'
import AuthContainer from './AuthContainer';
import Link from 'next/link'
import Typography from '@mui/material/Typography';
import { routes } from '../pages/routes';
import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../redux/root-reducer';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from "@mui/material";
import { addStudentStart } from '../redux/student/actions';
type Props = {}
import { useRouter } from 'next/router'
const StudentAdd = (props: Props) => {
    const { loading } = useSelector((state: AppState) => state.student);
    const dispatch = useDispatch();
    const [firstNameErrText, setFirstNameErrText] = useState("");
    const [lastNameErrText, setLastNameErrText] = useState("");
    const [genderErrText, setGenderErrText] = useState("");
    const [classroomIdErrText, setClassroomErrText] = useState("");
    const router = useRouter()
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setFirstNameErrText("");
        setLastNameErrText("");
        setGenderErrText("")
        setClassroomErrText("")
        const data: any = new FormData(e.target);
        const firstName = data.get("firstName").trim();
        const lastName = data.get("lastName").trim();
        const gender = data.get("gender").trim();
        const classroomId = data.get("classroomId").trim();
        let err = false;

        if (firstName === "") {
            err = true;
            setFirstNameErrText("Please fill this field");
        }
        if (lastName === "") {
            err = true;
            setLastNameErrText("Please fill this field");
        }
        if (gender === "") {
            err = true;
            setGenderErrText("Please fill this field");
        }
        if (classroomId === "") {
            err = true;
            setClassroomErrText("Please fill this field");
        }
        if (err) return;
        const studentInput: any = { firstName, lastName, gender, classroomId };
        console.log("🚀 ~ file: StudentAdd.tsx ~ line 44 ~ handleSubmit ~ studentInput", studentInput)
        if (firstName !== "" && lastName !== "" && gender !== "" && classroomId !== "") {
            dispatch(addStudentStart(studentInput))
            router.push("student");
        }
    };


    return (
        <div><Typography variant="h4" component="h1" textAlign={'center'}>
            Student Add
        </Typography>
            <AuthContainer>
                <Box component="form" onSubmit={(e: any) => handleSubmit(e)} noValidate>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        disabled={loading}
                        error={firstNameErrText !== ""}
                        helperText={firstNameErrText}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="lastName"
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        disabled={loading}
                        error={lastNameErrText !== ""}
                        helperText={lastNameErrText}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="gender"
                        id="gender"
                        label="Gender"
                        name="gender"
                        disabled={loading}
                        error={genderErrText !== ""}
                        helperText={genderErrText}
                    />
                    <InputLabel id="demo-simple-select-label">Lớp</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        type="classroomId"
                        id="classroomId"
                        name="classroomId"
                        required
                        fullWidth
                        variant="outlined"
                        sx={{ mb: 2 }}
                    >
                        <MenuItem value="Lớp 10">Lớp 10</MenuItem>
                        <MenuItem value="Lớp 11">Lớp 11</MenuItem>
                        <MenuItem value="Lớp 12">Lớp 12</MenuItem>
                    </Select>
                    <LoadingButton
                        variant="outlined"
                        fullWidth
                        color="success"
                        type="submit"
                        loading={loading}
                    >
                        Submit
                    </LoadingButton>
                </Box>
            </AuthContainer>
        </div>
    )
}

export default StudentAdd