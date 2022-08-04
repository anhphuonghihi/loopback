import { Fragment } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import Student from '../components/Student';
const StudentPage: NextPage = () => {

  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
  return (
    <Fragment>
      <Head>
        <title>Student</title>
      </Head>
      {accessToken && <Student />}
    </Fragment>
  );
};

export default StudentPage;