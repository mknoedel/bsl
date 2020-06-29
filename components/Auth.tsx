import FirebaseAuth from './FirebaseAuth'
// import { Typography } from '@material-ui/core'

const Auth = () => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh"
    }}>
      {/* <Typography style={{fontSize: '20px'}}>Sign in or Sign up</Typography> */}
      <FirebaseAuth />
    </div>
  )
}

export default Auth