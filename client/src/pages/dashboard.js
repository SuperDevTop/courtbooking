import React, { useEffect } from 'react';

import Topbar from '../components/Topbar';
import { Box, Grid } from '@mui/material';
import TimePanel from '../components/TimePanel';
import Court from '../components/Court';
import { getPlayersData } from '../actions/playerActions';
import { connect } from 'react-redux';

const Stadium_Booking = [
    {
        startTime : "8:00",
        endTime : "9:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "10:00",
        endTime : "10:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "10:30",
        endTime : "11:00",
        isBooked : false
    },
    {
        startTime : "11:00",
        endTime : "11:30",
        isBooked : false
    },
    {
        startTime : "8:00",
        endTime : "9:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "8:00",
        endTime : "9:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "8:00",
        endTime : "9:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "10:00",
        endTime : "10:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "10:30",
        endTime : "11:00",
        isBooked : false
    },
    {
        startTime : "11:00",
        endTime : "11:30",
        isBooked : false
    },
    {
        startTime : "8:00",
        endTime : "9:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "8:00",
        endTime : "9:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "8:00",
        endTime : "9:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "10:00",
        endTime : "10:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "10:30",
        endTime : "11:00",
        isBooked : false
    },
    {
        startTime : "11:00",
        endTime : "11:30",
        isBooked : false
    },
    {
        startTime : "8:00",
        endTime : "9:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "8:00",
        endTime : "9:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "8:00",
        endTime : "9:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "10:00",
        endTime : "10:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "10:30",
        endTime : "11:00",
        isBooked : false
    },
    {
        startTime : "11:00",
        endTime : "11:30",
        isBooked : false
    },
    {
        startTime : "8:00",
        endTime : "9:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "8:00",
        endTime : "9:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
];

const Grandstand_Booking = [
    {
        startTime : "8:00",
        endTime : "8:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : false
    },
    {
        startTime : "8:30",
        endTime : "9:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : false
    },
    {
        startTime : "9:00",
        endTime : "9:30",
        isBooked : false
    },
    {
        startTime : "9:30",
        endTime : "10:00",
        isBooked : false
    },
    {
        startTime : "10:00",
        endTime : "10:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : false
    },
    {
        startTime : "10:30",
        endTime : "11:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : false
    },
    {
        startTime : "8:00",
        endTime : "8:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : false
    },
    {
        startTime : "8:30",
        endTime : "9:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : false
    },
    {
        startTime : "9:00",
        endTime : "9:30",
        isBooked : false
    },
    {
        startTime : "9:30",
        endTime : "10:00",
        isBooked : false
    },
    {
        startTime : "10:00",
        endTime : "10:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : false
    },
    {
        startTime : "10:30",
        endTime : "11:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : false
    },
    {
        startTime : "8:00",
        endTime : "8:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : false
    },
    {
        startTime : "8:30",
        endTime : "9:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : false
    },
    {
        startTime : "9:00",
        endTime : "9:30",
        isBooked : false
    },
    {
        startTime : "9:30",
        endTime : "10:00",
        isBooked : false
    },
    {
        startTime : "10:00",
        endTime : "10:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : false
    },
    {
        startTime : "10:30",
        endTime : "11:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : false
    },
    {
        startTime : "8:00",
        endTime : "8:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : false
    },
    {
        startTime : "8:30",
        endTime : "9:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : false
    },
    {
        startTime : "9:00",
        endTime : "9:30",
        isBooked : false
    },
    {
        startTime : "9:30",
        endTime : "10:00",
        isBooked : false
    },
    {
        startTime : "10:00",
        endTime : "10:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : false
    },
    {
        startTime : "10:30",
        endTime : "11:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : false
    },
];

const BB_Booking = [
    {
        startTime : "8:00",
        endTime : "8:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "9:00",
        endTime : "9:30",
        isBooked : false
    },
    {
        startTime : "8:30",
        endTime : "9:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "9:30",
        endTime : "10:00",
        isBooked : false
    },
    {
        startTime : "10:00",
        endTime : "10:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : false
    },
    {
        startTime : "10:30",
        endTime : "11:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "8:00",
        endTime : "8:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "9:00",
        endTime : "9:30",
        isBooked : false
    },
    {
        startTime : "8:30",
        endTime : "9:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "9:30",
        endTime : "10:00",
        isBooked : false
    },
    {
        startTime : "10:00",
        endTime : "10:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : false
    },
    {
        startTime : "10:30",
        endTime : "11:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "8:00",
        endTime : "8:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "9:00",
        endTime : "9:30",
        isBooked : false
    },
    {
        startTime : "8:30",
        endTime : "9:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "9:30",
        endTime : "10:00",
        isBooked : false
    },
    {
        startTime : "10:00",
        endTime : "10:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : false
    },
    {
        startTime : "10:30",
        endTime : "11:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "8:00",
        endTime : "8:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "9:00",
        endTime : "9:30",
        isBooked : false
    },
    {
        startTime : "8:30",
        endTime : "9:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "9:30",
        endTime : "10:00",
        isBooked : false
    },
    {
        startTime : "10:00",
        endTime : "10:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : false
    },
    {
        startTime : "10:30",
        endTime : "11:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
];

const Dashboard = ({getPlayersData, players}) => {

    useEffect(() => {
        getPlayersData();
    }, [getPlayersData])

    console.log(players);

    return (
        <Box>
            <Topbar />
            <Box>
                <Grid container>
                    <Grid item xs={12} sm={3} md={2} lg={2}>
                        <TimePanel />
                    </Grid>
                    <Grid item xs={12} sm={3} md={2} lg={2}>
                        <Court 
                            title='Stadium' 
                            headerColor='green'
                            booking = {Stadium_Booking} 
                            players={players}
                        /> 
                    </Grid>
                    <Grid item xs={12} sm={3} md={2} lg={2}>
                        <Court 
                            title='Grandstand' 
                            headerColor='red'
                            booking = {Grandstand_Booking} 
                            players={players}

                        /> 
                    </Grid>
                    <Grid item xs={12} sm={3} md={2} lg={2}>
                        <Court 
                            title='BB' 
                            headerColor='yellow'
                            players={players}
                            booking = {BB_Booking} 
                        /> 
                    </Grid>
                    <Grid item xs={12} sm={3} md={2} lg={2}>
                        <Court 
                            title='Court1' 
                            headerColor='green'
                            players={players}
                            booking = {Stadium_Booking} 
                        /> 
                    </Grid>
                    <Grid item xs={12} sm={3} md={2} lg={2}>
                        <Court 
                            title='Court2' 
                            headerColor='red'
                            players={players}
                            booking = {Grandstand_Booking} 
                        /> 
                    </Grid>
                    {/* <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Court 
                            title='Court3' 
                            headerColor='yellow'
                            booking = {BB_Booking} 
                        /> 
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Court 
                            title='Court4' 
                            headerColor='green'
                            booking = {Stadium_Booking} 
                        /> 
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Court 
                            title='Court5' 
                            headerColor='red'
                            booking = {Grandstand_Booking} 
                        /> 
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Court 
                            title='Court6' 
                            headerColor='yellow'
                            booking = {BB_Booking} 
                        /> 
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Court 
                            title='Court7' 
                            headerColor='green'
                            booking = {Stadium_Booking} 
                        /> 
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Court 
                            title='Court8' 
                            headerColor='red'
                            booking = {Grandstand_Booking} 
                        /> 
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Court 
                            title='Court9' 
                            headerColor='yellow'
                            booking = {BB_Booking} 
                        /> 
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Court 
                            title='Court10' 
                            headerColor='green'
                            booking = {Stadium_Booking} 
                        /> 
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Court 
                            title='Court11' 
                            headerColor='red'
                            booking = {Grandstand_Booking} 
                        /> 
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Court 
                            title='Court12' 
                            headerColor='yellow'
                            booking = {BB_Booking} 
                        /> 
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Court 
                            title='Court13' 
                            headerColor='green'
                            booking = {Stadium_Booking} 
                        /> 
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Court 
                            title='Court14' 
                            headerColor='red'
                            booking = {Grandstand_Booking} 
                        /> 
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Court 
                            title='Court15' 
                            headerColor='yellow'
                            booking = {BB_Booking} 
                        /> 
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Court 
                            title='Court16' 
                            headerColor='green'
                            booking = {Stadium_Booking} 
                        /> 
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Court 
                            title='Court17' 
                            headerColor='red'
                            booking = {Grandstand_Booking} 
                        /> 
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Court 
                            title='Court18' 
                            headerColor='yellow'
                            booking = {BB_Booking} 
                        /> 
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Court 
                            title='Court19' 
                            headerColor='green'
                            booking = {Stadium_Booking} 
                        /> 
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Court 
                            title='Court20' 
                            headerColor='red'
                            booking = {Grandstand_Booking} 
                        /> 
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Court 
                            title='Court21' 
                            headerColor='yellow'
                            booking = {BB_Booking} 
                        /> 
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Court 
                            title='Court22' 
                            headerColor='green'
                            booking = {Stadium_Booking} 
                        /> 
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Court 
                            title='Court23' 
                            headerColor='red'
                            booking = {Grandstand_Booking} 
                        /> 
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Court 
                            title='Court24' 
                            headerColor='yellow'
                            booking = {BB_Booking} 
                        /> 
                    </Grid> */}
                </Grid>
            </Box>
        </Box>
    )
};

const mapDispatchToProps = (dispatch) => ({
    getPlayersData: () => dispatch(getPlayersData())
 })
 

const mapStateToProps = (state) => ({
    players: state.players.players,
})

export default connect(mapStateToProps, mapDispatchToProps)( Dashboard );