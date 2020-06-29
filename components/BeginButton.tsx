import { useUser } from '../utils/auth/userUser'
import { Button, Box } from '@material-ui/core'
import Auth from './Auth'

const BeginButton = (props: {
  handleStart: () => void
  classes?: any
}) => {
  const { handleStart, classes = {} } = props
  const { user } = useUser()

  return (
    <Box 
      display="flex" 
      width={'100%'} height={30} 
      alignItems="center"
      justifyContent="center"
      style={{marginBottom: "35px"}}
    >
      {user?.id ? (
        <Button
          // autoFocus
          suppressHydrationWarning={true}
          style={{justifyContent: 'center'}}
          variant="contained"
          color="primary"
          onClick={handleStart}
          className={classes.button}
        > Let's Get Started {user.displayName.split(' ')[0]}
        </Button>
      ) : (
        <Auth/>
      )}
    </Box>

  )
}

export default BeginButton