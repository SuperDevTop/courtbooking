import React from 'react';
import { Box, Typography } from '@mui/material';
import { TimeIcon } from '@mui/x-date-pickers';
import TimeBox from './layout/TimeBox';

const TimePanel = () => {

    const timeTexts = ['8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
                       '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
                       '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM'];

    return (
        <Box>
            <Box
                sx={{
                    backgroundColor: 'yellow',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1
                }}
                padding={2}
                
            >
                <TimeIcon sx={{verticalAlign: 'bottom'}}/>
                <strong>&nbsp;Time </strong>
            </Box>
            <Box
                sx={{
                    backgroundColor: 'primary.light',
                    color: 'white',
                    border: '2px solid #a0a0a0',
                }}
            >
                <Box sx={{
                        borderBottom: '2px solid #a0a0a0',
                        height: 278,
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                    <Typography textAlign={'center'} variant='h5'>
                        8:00 AM
                    </Typography>
                </Box>
                {
                    timeTexts.map((text, index) => (
                        <TimeBox text={text} key={index}/>
                    ))
                }

            </Box>
        </Box>

    )
}

export default TimePanel;