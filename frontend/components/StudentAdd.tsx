import React, { useState, useEffect } from 'react'
import AuthContainer from './AuthContainer';
import Link from 'next/link'
import Typography from '@mui/material/Typography';
import { routes } from '../pages/routes';
import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
import FormHelperText from '@mui/material/FormHelperText';
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
    const { editstudent } = useSelector((state: AppState) => state.student);
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [classroomId, setClassroom] = useState("");
    const [firstNameErrText, setFirstNameErrText] = useState("");
    const [lastNameErrText, setLastNameErrText] = useState("");
    const [genderErrText, setGenderErrText] = useState("");
    const [classroomIdErrText, setClassroomErrText] = useState("");
    const router = useRouter()
    const [edit, setEdit] = useState("")
    useEffect(() => {
        setEdit(editstudent.id)
        setFirstName(editstudent.firstName)
        setLastName(editstudent.lastName)
        setGender(editstudent.gender)
        setClassroom(editstudent.classroomId)
    }, [editstudent])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setFirstNameErrText("");
        setLastNameErrText("");
        setGenderErrText("")
        setClassroomErrText("")

        let err = false;

        if (firstName === ""||firstName === undefined) {
            err = true;
            setFirstNameErrText("Please fill this field");
        }
        if (lastName === ""||lastName === undefined) {
            err = true;
            setLastNameErrText("Please fill this field");
        }
        if (gender === ""||gender === undefined) {
            err = true;
            setGenderErrText("Please fill this field");
        }
        if (classroomId === ""||classroomId === undefined) {
            err = true;
            setClassroomErrText("Please fill this field");
        }
        if (err) return;
        const studentInput: any = { firstName, lastName, gender, classroomId };
        if (firstName !== "" && lastName !== "" && gender !== "" && classroomId !== "") {
            if (edit) {
                dispatch(addStudentStart(studentInput))
            } else {
                dispatch(addStudentStart(studentInput))
            }
        }
    };


    return (
        <div><Typography variant="h4" component="h1" textAlign={'center'}>
            Student Add
        </Typography>
            <AuthContainer>
                <Box component="form" onSubmit={(e: any) => handleSubmit(e)} noValidate>
                    <TextField
                        value={firstName}
                        onChange={(e: any) => setFirstName(e.target.value)}
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
                        value={lastName}
                        onChange={(e: any) => setLastName(e.target.value)}
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
                        value={gender}
                        onChange={(e: any) => setGender(e.target.value)}
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
                        value={classroomId}
                        onChange={(e: any) => setClassroom(e.target.value)}
                        labelId="demo-simple-select-label"
                        type="classroomId"
                        id="classroomId"
                        name="classroomId"
                        required
                        fullWidth
                        variant="outlined"

                    >
                        <MenuItem value="Lớp 10">Lớp 10</MenuItem>
                        <MenuItem value="Lớp 11">Lớp 11</MenuItem>
                        <MenuItem value="Lớp 12">Lớp 12</MenuItem>
                    </Select>
                    <FormHelperText>{classroomIdErrText && classroomIdErrText}</FormHelperText>
                    <LoadingButton
                        sx={{ mt: 2 }}
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