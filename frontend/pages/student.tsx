import { Fragment } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import Student from '../components/Student';
const StudentPage: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Student</title>
      </Head>
      <Student />
    </Fragment>
  );
};

export default StudentPage;