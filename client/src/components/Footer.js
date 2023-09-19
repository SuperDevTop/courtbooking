import React from 'react';
import { Box } from '@mui/material';

const Footer = () => {

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    return(
        <Box
            bgcolor={'#1976d2'}
            mt={2}
            py={2}
            color={'white'}
            textAlign={'center'}
        >
            Copyright @ {currentYear} BookingCourt
        </Box>
    )
}

export default Footer;