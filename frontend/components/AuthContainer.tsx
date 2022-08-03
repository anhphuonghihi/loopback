import React from 'react'

import Container from '@mui/material/Container';
type Props = {

    children: NonNullable<React.ReactNode>;
}

const AuthContainer= ({ children }: Props) => {
    return (
        <Container maxWidth="sm" disableGutters>
            {children}
        </Container>
    )
}

export default AuthContainer