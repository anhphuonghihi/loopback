import { Fragment } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import StudentAdd from '../components/StudentAdd';
const studentAddPage: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Student Add</title>
      </Head>
      <StudentAdd />
    </Fragment>
  );
};

export default studentAddPage;