import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';

//Controller
import getUserInfo from '../Controller/get-user-info';

const PROFILE_INFO_DISPLAY = () => {
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        getUserInfo((user_info) => {
            setUserData(user_info);
        }, (err) => {
           window.location = '/logout.php';
        })
    }, [])
    return <>
        <Box sx={{ display: 'flex', position: 'absolute', left: '0', top: '81%', paddingLeft: '40px'}}>
            {
                userData? <>
                    <Avatar alt="dp" src={userData.picture} sx={{ border: '4px solid white', width: '55px', height: '55px'}} />
                </> : <>
                    <Skeleton animation="wave" variant="circular" sx={{ border: '4px solid white', backgroundColor: '#e9e9e9'}} width={55} height={55} />
                </>
            }
            <Box sx={{ display: 'flex', flexWrap: 'wrap', flex: '1', alignItems: 'center', marginLeft: '15px'}}>
                {
                    userData? <>
                        <Typography sx={{ flex: '0 1 100%', fontSize: '21px', fontWeight: 'bold', color: '#40424a'}}>{userData.name}</Typography>
                        <Typography sx={{ fontSize: '13px', lineHeight: '1', color: 'rgb(47, 85, 151)'}}>{userData.email}</Typography>
                    </> : <>
                        <Box sx={{ flex: '0 1 100%',}}>
                            <Skeleton variant="text" sx={{ backgroundColor: '#e9e9e9' }} height={30} width={180} />
                        </Box>
                        <Box sx={{ flex: '0 1 100%'}}>
                            <Skeleton variant="text" sx={{ backgroundColor: '#e9e9e9' }} height={20} width={140} />
                        </Box>
                    </>
                }
            </Box>
        </Box>
    </>
}

export default PROFILE_INFO_DISPLAY;
