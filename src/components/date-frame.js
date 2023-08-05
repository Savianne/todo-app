import './date-frame.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import PROFILE_INFO_DISPLAY from './profile-info-display';

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
            <div className='gradient-box'></div>
            <PROFILE_INFO_DISPLAY />
        </div>
    </>
}

export default DATE_FRAME;