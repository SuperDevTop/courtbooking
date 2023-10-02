import React from 'react';
import { Box, Typography } from '@mui/material';
import { TimeIcon } from '@mui/x-date-pickers';
import TimeBox from './layout/TimeBox';
import { timeTexts } from '../utils/timeTexts';

const TimePanel = () => {
    
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
                    backgroundColor: 'primary.dark',
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