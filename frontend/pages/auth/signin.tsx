import React from 'react'
import Head from 'next/head';
import SignIn from '../../components/SignIn';


import { routes } from '../routes';
type Props = {}

const signin = (props: Props) => {
    return (
        <>
            <Head>
                <title>Sign In</title>
            </Head>
            <SignIn />
        </>
    )
}

export default signin