import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Link from 'next/link'
import Stack from '@mui/material/Stack';
type Props = {}
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { AppState } from '../redux/root-reducer';
import { signOutSuccess } from '../redux/auth/actions';
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
const Header = (props: Props) => {
  const [auth, setAuth] = useState(false)
  const dispatch = useDispatch();
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
  const { viewer } = useSelector((state: AppState) => state.auth);
  const onLogout = () => {
    window.localStorage.clear();
    dispatch(signOutSuccess(true));
  }
  useEffect(() => {
    if (viewer || accessToken) {
      setAuth(true)
    } else {
      setAuth(false)
    }
  }, [viewer, accessToken])

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Stack spacing={2} direction="row">
          {!auth && <Link href="/auth/signin">
            <a>
              <Button variant="contained">Login</Button>
            </a>
          </Link>}
          {auth && <><Link href="/student">
            <a>
              <Button variant="contained">Student</Button>
            </a>
          </Link>
            <Button variant="contained" onClick={onLogout}
            >Logout</Button></>}
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Header