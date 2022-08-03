import React from 'react'
import Head from 'next/head';
import SignUp from '../../components/SignUp';


import { routes } from '../routes';
type Props = {}

const signup = (props: Props) => {
    return (
        <>
            <Head>
                <title>Sign Up</title>
            </Head>
            <SignUp />
        </>
    )
}

export default signup