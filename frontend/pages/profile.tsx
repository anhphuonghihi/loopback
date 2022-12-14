import { Fragment } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import Student from '../components/Student';
import { useSelector } from 'react-redux';
import { TableContainer, Paper, TableHead, Table, TableRow, TableCell, TableBody } from '@mui/material';
import { AppState } from '../redux/root-reducer';
const ProfilePage: NextPage = () => {

  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
  const { viewers } = useSelector((state: AppState) => state.auth);
  return (
    <Fragment>
      <Head>
        <title>Profile</title>
      </Head>
      {accessToken && <TableContainer component={Paper} elevation={6}>
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
            <TableCell align="right">{viewers && viewers.id}</TableCell>
          </TableBody>
        </Table>
      </TableContainer>}
    </Fragment >
  );
};

export default ProfilePage;