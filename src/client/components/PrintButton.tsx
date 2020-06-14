import React from 'react';
import { Box, Button } from "@material-ui/core"

const PrintButton = (props: {mobileMode?: boolean}) => ( 
    <div>
        <Box 
            display="flex" 
            width={'100%'} height={30} 
            alignItems="center"
            justifyContent="center"
            style={{marginBottom: "35px"}}
        >
            <Button
                style={{justifyContent: 'center'}}
                variant="contained"
                color="primary"
                onClick={() => {
                    let css: any = null
                    if (!props.mobileMode) {
                        /* Create style document */ 
                        let makeLandscapeStyle = '@page { size: landscape;}'
                        css = document.createElement('style'); 
                        css.type = 'text/css'; 
                        css.appendChild(document.createTextNode(makeLandscapeStyle)); 
                        /* Append style to the tag name */ 
                        document.getElementsByTagName("head")[0].appendChild(css);
                    }
                    window.print()
                    if (css) {
                        document.getElementsByTagName("head")[0].removeChild(css)
                    }
                    return false
                }}
            > Print Results
            </Button>
        </Box>
    </div>
  )
  
  export default PrintButton