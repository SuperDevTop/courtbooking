import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material';
import { connect } from 'react-redux';

const Footer = ({ isAuthenticated }) => {
    const theme = useTheme()
    const { primary } = theme.palette;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    return(
        <Box
            bgcolor= {primary.dark}
            mt={2}
            py={5}
            color='white'
            textAlign='center'
            display={
                isAuthenticated ? "block" : 'none'
            }
        >
            Copyright @ {currentYear} BookingCourt
        </Box>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Footer);