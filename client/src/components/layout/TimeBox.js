import React from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';

const TimeBox = ({ text }) => {
    return(
        <Box justifyContent={'center'} sx={{
            borderBottom: '2px solid #a0a0a0',
            borderTop: '2px solid #a0a0a0',
            height: 280,
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Typography textAlign={'center'} justifyContent={'center'} variant='h5'>
                {text}
            </Typography>
        </Box>
    )
}

export default TimeBox;