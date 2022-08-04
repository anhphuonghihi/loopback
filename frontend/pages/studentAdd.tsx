import { Fragment } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import StudentAdd from '../components/StudentAdd';
const studentAddPage: NextPage = () => {

  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
  return (
    <Fragment>
      <Head>
        <title>Student Add</title>
      </Head>
      {accessToken && <StudentAdd />}
    </Fragment>
  );
};

export default studentAddPage;