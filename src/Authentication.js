import './Authentication.css';
import React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

function AUTH_PAGE() {
    const [authUrl, setAuthUrl] = useState(null);
    useEffect(() => {
        fetch('/GoogleAuth/auth-url.php', {method: 'POST'})
        .then(response => {
            if(response.ok) {
                return response.json()
            }
        })
        .then(data => {
           setAuthUrl(data.auth_url)
        })
        .catch(err => {
            alert('Error Occured! Please Retry')
        })
    }, []);
  return <>
    <div className="main-container">
      <div className="middle-container">
        <h1>ToDo App Authentication</h1>
        <div className="left-content">
          <DATE_FRAME />
          <Box sx={{ display: 'flex', flex: '0 1 100%', height: '150px', alignItems: 'center', justifyContent: 'center'}}>
            {
                authUrl? <>
                    <Box sx={{ justifyContent: 'center', margin: '20px 0'}}>
                        <CUSTOM_SIGNIN_BUTTON authUrl={authUrl} />
                    </Box>
                </> : <>
                    <Box sx={{ justifyContent: 'center', margin: '20px 0'}}>
                        <p style={{display: 'flex', flex: '0 1 100%', justifyContent: 'center', marginBottom: '5px', color: 'gray'}}>Loading Google Auth URL...</p>
                        <Skeleton sx={{ borderRadius: ' 5px'}} variant="rectangular" width={300} height={50} />
                    </Box>
                </>
            }
          </Box>
        </div>
      </div>
    </div>
  </>
}

const DATE_FRAME = () => {
    const date = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return <>
        <div className="date-frame">
            <Box style={{ display: 'flex', flex: '1', flexWrap: 'wrap', height: 'fit-content', padding: '25px 40px', lineHeight: '1' }}>
                <Typography sx={{ color: 'white', fontSize: '27px', fontWeight: 'bold'}}>{days[date.getDay()]}</Typography>
                <Typography sx={{ display: 'flex', flex: ' 0 1 80%', color: 'rgb(242,242, 242)', fontSize: '12px'}}>{`${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`}</Typography>
            </Box>
        </div>
    </>
}

const CUSTOM_SIGNIN_BUTTON = ({authUrl}) => {
    return <>
        <div id="custom-signin-w-google-btn" style={{display: 'flex', alignItems: 'center'}}
        onClick={() => {
            window.location = authUrl
        }}>
            <span className="goggle-logo">
                <img src="assets/images/google-logo.png" style={{width: '30px', height: '30px'}} alt="Google logo" />
            </span>
            <h1 style={{color: 'black', fontSize: '18px', fontWeight: 'normal', margin: '0 10px'}}>Continue with Google</h1>
        </div>
    </>
}
export default AUTH_PAGE;
