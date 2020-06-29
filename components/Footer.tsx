import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { Box } from '@material-ui/core';
import { useUser } from '../utils/auth/userUser';

const Footer: React.FunctionComponent<{}> = () =>  {
  const router = useRouter()
  const { user, logout } = useUser()

  const handleReset = () => {
    localStorage.clear()
    router.push('/')
  };

  return (
    <footer>
      <Box 
        display="flex" 
        width={'100%'} height={30} 
        alignItems="center"
        justifyContent="center"
        style={{marginBottom: "35px"}}
      >
        BSL Balance
        
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <Link href={"/"}>
          <a>{"Home"}</a>
        </Link>

        {user?.id && (
          <>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <Link href={'/account/update-name'}>
              <a>Account Management</a>
            </Link>
          </>
        )}

        &nbsp;&nbsp;|&nbsp;&nbsp;
        <a onClick={handleReset}>Total Reset</a>

        {user?.id && (
          <>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <a onClick={logout}>Logout</a>
          </>
        )}

        <style jsx>{`
            a {
              font-family: 'Arial';
              text-decoration: none;
              color: blue;
              cursor: pointer;
            }

            a:hover {
              opacity: 0.6;
            }
          `}</style>
      </Box>
      <br />
    </footer>
  )
}

export default Footer
