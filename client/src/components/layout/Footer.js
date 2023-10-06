import React from 'react';
import { Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material';
import { connect } from 'react-redux';

const Footer = ({ isAuthenticated }) => {
    const theme = useTheme()
    const { primary } = theme.palette;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    return (
        <Box
            bgcolor= {primary.dark}
            mt={2}
            py={4}
            color='white'
            textAlign='center'
            display={
                isAuthenticated ? "block" : 'none'
            }
        >
            <Grid container alignItems={'center'}>
                <Grid item xs={4}>
                    6, 345, 450 <br></br>
                    Registered Players
                </Grid>
                <Grid item xs={4}>
                    Copyright @ {currentYear} BookingCourt
                </Grid>
                <Grid item xs={4}></Grid>
            </Grid>
        </Box>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Footer);