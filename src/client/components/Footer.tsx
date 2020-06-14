import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { Box } from '@material-ui/core';

const Footer: React.FunctionComponent<{}> = () =>  {
  const router = useRouter()


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
        BSL Balance &nbsp;&nbsp;|&nbsp;&nbsp;

        <Link href={"/"} as={"/"}>
          <a>{"Home"}</a>
        </Link>
        &nbsp;&nbsp;|&nbsp;&nbsp;

        <a onClick={handleReset}>Total Reset</a>

        <style jsx>{`
            a {
              font-family: 'Arial';
              text-decoration: none;
              color: blue;
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
