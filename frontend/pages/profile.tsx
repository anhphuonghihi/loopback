import { Fragment } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import Student from '../components/Student';
import { useSelector } from 'react-redux';
import { TableContainer, Paper, TableHead, Table, TableRow, TableCell, TableBody } from '@mui/material';
import { AppState } from '../redux/root-reducer';
const ProfilePage: NextPage = () => {
  const { viewer } = useSelector((state: AppState) => state.auth);
  return (
    <Fragment>
      <Head>
        <title>Profile</title>
      </Head>
      <TableContainer component={Paper} elevation={6}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2} align="center">
                User profile
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableCell component="th" scope="row">
              ID
            </TableCell>
            <TableCell align="right">{viewer.id}</TableCell>
        </TableBody>
      </Table>
    </TableContainer>
    </Fragment >
  );
};

export default ProfilePage;