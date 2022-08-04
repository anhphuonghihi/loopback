import React, { useEffect, useState } from 'react'
type Props = {}
import { useDispatch, useSelector } from 'react-redux';
import { getStudentStart, deleteStudentStart,getEditStudentStart } from '../redux/student/actions';
import { AppState } from '../redux/root-reducer';
import Link from 'next/link'
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
// import DeleteIcon from '@mui/icons-material/Delete';
import { TableContainer, Paper, TableHead, Table, TableRow, TableCell, TableBody } from '@mui/material';
const Student = (props: Props) => {
  const router = useRouter()
  const { student } = useSelector((state: AppState) => state.student);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStudentStart());
  }, [dispatch])
  const deleteStudent = (id: any) => {
    dispatch(deleteStudentStart(id));
  }
  const viewEditStudent =(id: any) => {
    dispatch(getEditStudentStart(id));
    router.push("/student/edit");
  }
  return (
    <TableContainer component={Paper} elevation={6}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2} align="left">
              User profile
            </TableCell>
            <TableCell colSpan={2} align="right">
              <Link href="studentAdd">Add</Link>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow >
            <TableCell >
              STT
            </TableCell>
            <TableCell >
              Họ
            </TableCell>
            <TableCell >
              Tên
            </TableCell>
            <TableCell >
              Giới tính
            </TableCell>
            <TableCell >
              Lớp
            </TableCell>
            <TableCell >
              Trạng Thái
            </TableCell>
          </TableRow>
          {student.map((students: any, index: number) => (
            <TableRow key={index}>
              <TableCell >
                {index + 1}
              </TableCell>
              <TableCell >
                {students.firstName}
              </TableCell>
              <TableCell >
                {students.lastName}
              </TableCell>
              <TableCell >
                {students.gender}
              </TableCell>
              <TableCell >
                {students.classroomId}
              </TableCell>
              <TableCell >

                <Button variant="outlined" onClick={() => deleteStudent(students.id)}>
                  Delete
                </Button>
                <Button variant="outlined" onClick={() => viewEditStudent(students.id)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Student