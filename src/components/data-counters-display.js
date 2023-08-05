import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

const DATA_COUNTERS_DISPLAY = ({dataCounters}) => {
    const [counters, updateCounters] = useState(dataCounters);
    useEffect(() => {
        updateCounters(dataCounters);
    }, [dataCounters])
    return <>
        <Box sx={{ display: 'flex', flex: '0 1 90%', alignItems: 'center', justifyContent: 'center', height: '150px', borderBottom: '1px solid rgb(217, 217, 217)'}}>
            <Box sx={{ display: 'flex', flex: '0 1 100%', height: 'fit-content'}}>
                <Box sx={{ display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <Typography sx={{ flex: '0 1 100%', fontSize: '20px', fontWeight: 'bold', color: 'rgb(64, 64, 64)'}}>All</Typography>
                    <Typography sx={{ flex: '0 1 100%', fontSize: '18px', fontWeight: 'bold', color: 'rgb(0, 176, 240)', marginTop: '10px'}}>{counters.all}</Typography>
                </Box>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Box sx={{ display: 'flex', flex: '1.5', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <Typography sx={{ flex: '0 1 100%', fontSize: '20px', fontWeight: 'bold', color: 'rgb(64, 64, 64)'}}>Completed</Typography>
                    <Typography sx={{ flex: '0 1 100%', fontSize: '18px', fontWeight: 'bold', color: 'rgb(0, 176, 240)', marginTop: '10px'}}>{counters.completed}</Typography>
                </Box>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Box sx={{ display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <Typography sx={{ flex: '0 1 100%', fontSize: '20px', fontWeight: 'bold', color: 'rgb(64, 64, 64)'}}>To do</Typography>
                    <Typography sx={{ flex: '0 1 100%', fontSize: '18px', fontWeight: 'bold', color: 'rgb(0, 176, 240)', marginTop: '10px'}}>{counters.todo}</Typography>
                </Box>
            </Box>
        </Box>
    </>
}

export default DATA_COUNTERS_DISPLAY;