import React, { useEffect, useState } from 'react';

import { Box, Grid } from '@mui/material';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import { logOut } from '../actions/authActions';
import TimePanel from '../components/TimePanel';
import Court from '../components/Court';
import { getPlayersData } from '../actions/playerActions';
import setAuthToken from '../utils/setAuthToken';
import Topbar from '../components/layout/Topbar';

const Stadium_Booking = [
    {
        startTime : "8:00",
        endTime : "8:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "8:30",
        endTime : "9:00",
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
        startTime : "9:30",
        endTime : "10:00",
        isBooked : false
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
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "11:00",
        endTime : "11:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "11:30",
        endTime : "12:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "12:00",
        endTime : "12:30",
        isBooked : false
    },
    {
        startTime : "12:30",
        endTime : "1:00",
        isBooked : false
    },
    {
        startTime : "1:00",
        endTime : "1:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "1:30",
        endTime : "2:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "2:00",
        endTime : "2:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "2:30",
        endTime : "3:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "3:00",
        endTime : "3:30",
        isBooked : false
    },
    {
        startTime : "3:30",
        endTime : "4:00",
        isBooked : false
    },
    {
        startTime : "4:00",
        endTime : "4:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "4:30",
        endTime : "5:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "5:00",
        endTime : "5:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "5:30",
        endTime : "6:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "6:00",
        endTime : "6:30",
        isBooked : false
    },
    {
        startTime : "6:30",
        endTime : "7:00",
        isBooked : false
    },
    {
        startTime : "7:00",
        endTime : "7:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "7:30",
        endTime : "8:00",
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
        startTime : "11:00",
        endTime : "11:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : false
    },
    {
        startTime : "11:30",
        endTime : "12:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : false
    },
    {
        startTime : "12:00",
        endTime : "12:30",
        isBooked : false
    },
    {
        startTime : "12:30",
        endTime : "1:00",
        isBooked : false
    },
    {
        startTime : "1:00",
        endTime : "1:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : false
    },
    {
        startTime : "1:30",
        endTime : "2:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : false
    },
    {
        startTime : "2:00",
        endTime : "2:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : false
    },
    {
        startTime : "2:30",
        endTime : "3:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : false
    },
    {
        startTime : "3:00",
        endTime : "3:30",
        isBooked : false
    },
    {
        startTime : "3:30",
        endTime : "4:00",
        isBooked : false
    },
    {
        startTime : "4:00",
        endTime : "4:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : false
    },
    {
        startTime : "4:30",
        endTime : "5:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : false
    },
    {
        startTime : "5:00",
        endTime : "5:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : false
    },
    {
        startTime : "5:30",
        endTime : "6:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : false
    },
    {
        startTime : "6:00",
        endTime : "6:30",
        isBooked : false
    },
    {
        startTime : "6:30",
        endTime : "7:00",
        isBooked : false
    },
    {
        startTime : "7:00",
        endTime : "7:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : false
    },
    {
        startTime : "7:30",
        endTime : "8:00",
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
        startTime : "8:30",
        endTime : "9:00",
        isBooked : false
    },
    {
        startTime : "9:00",
        endTime : "9:30",
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
        startTime : "11:00",
        endTime : "11:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "11:30",
        endTime : "12:00",
        isBooked : false
    },
    {
        startTime : "12:00",
        endTime : "12:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "12:30",
        endTime : "1:00",
        isBooked : false
    },
    {
        startTime : "1:00",
        endTime : "1:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : false
    },
    {
        startTime : "1:30",
        endTime : "2:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "2:00",
        endTime : "2:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "2:30",
        endTime : "3:00",
        isBooked : false
    },
    {
        startTime : "3:00",
        endTime : "3:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "3:30",
        endTime : "4:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "4:00",
        endTime : "4:30",
        isBooked : false
    },
    {
        startTime : "4:30",
        endTime : "5:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : false
    },
    {
        startTime : "5:00",
        endTime : "5:30",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "5:30",
        endTime : "6:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "6:00",
        endTime : "6:30",
        isBooked : false
    },
    {
        startTime : "6:30",
        endTime : "7:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : true
    },
    {
        startTime : "7:00",
        endTime : "7:30",
        isBooked : false
    },
    {
        startTime : "7:30",
        endTime : "8:00",
        booker : "Andrey Rublev",
        player : 'Karen Kachanov',
        isBooked : false
    },

];

let bookings = [];

for (let index = 0; index < 27; index++) {
    var remain = index % 3;

    if (remain === 0) {
        bookings.push(Stadium_Booking)
    } else if (remain === 1) {
        bookings.push(Grandstand_Booking)
    } else {
        bookings.push(BB_Booking)
    }
}

const Dashboard = ({ getPlayersData, players, currentPage }) => {

    const dispatch = useDispatch()
    const history = useNavigate()

    useEffect(() => {
        setInterval(() => {
            if (localStorage.token) {
                const decoded = jwtDecode(localStorage.token)
                const currentTime = Date.now() / 1000
              
                if (decoded.exp < currentTime) {
                  localStorage.removeItem('token')
                  setAuthToken(false)
                  dispatch(logOut(history))
                } 
            }
        }, 5000);
    }, [dispatch, history])

    useEffect(() => {
        getPlayersData();
    }, [getPlayersData])

    const titles = ['Stadium', 'Grandstand', 'BB', 'Court1', 'Court2', 'Court3', 'Court4', 'Court5', 
                    'Court6', 'Court7', 'Court8', 'Court9', 'Court10', 'Court11', 'Court12', 'Court13', 
                    'Court14', 'Court15', 'Court16', 'Court17', 'Court18', 'Court19', 'Court20', 'Court21',
                    'Court22', 'Court23', 'Court24'];
    const colors = ['green', 'red', 'yellow', 'blue', 'pink']
    const [displayedCourts, setdisplayedCourts] = useState([])

    useEffect(() => {
        let temp = [];

        if (currentPage === 6) {
            temp = [25, 26]
        } else {
            for (let index = 5 * (currentPage - 1); index < 5 * currentPage; index++) {
                temp.push(index)            
            }
        }

        setdisplayedCourts(temp)
    }, [currentPage])
    
    return (
        <>
            <Topbar />
            <Box marginBottom={8}>
                <Grid container>
                    <Grid item xs={12} sm={3} md={2} lg={2}>
                        <TimePanel />
                    </Grid>
                    {
                        displayedCourts.map((court) => (
                            <Grid item xs={12} sm={3} md={2} lg={2} key={court}>
                                <Court 
                                    name={ titles[court] } 
                                    headerColor={ colors[court % 5] }
                                    booking = { bookings[court] } 
                                    players={ players }
                                />
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </>
    )
};

const mapDispatchToProps = (dispatch) => ({
    getPlayersData: () => dispatch(getPlayersData())
 })
 

const mapStateToProps = (state) => ({
    players: state.players.players,
    currentPage: state.page.currentPage,
})

export default connect(mapStateToProps, mapDispatchToProps)( Dashboard );