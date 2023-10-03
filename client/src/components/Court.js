import { Box, Button, Typography, Grid, MenuItem } from '@mui/material';
import React, { useEffect } from 'react';
import StadiumIcon from '@mui/icons-material/Stadium';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { TextField } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import { connect } from 'react-redux';
import { Select } from '@mui/material';
import {FormControl, InputLabel} from '@mui/material';
import WorldFlag from 'react-country-flag';

import ImageCard from '../components/ImageCard';
import { createBook } from '../actions/bookingAction';
import { alpha3ToAlph2 } from '../utils/countryCode';

// const theme = createTheme({
//     components: {
//         MuiButton: {
//             styleOverrides: {
//                 root: {
//                     backgroundColor: '#0ef05d'
//                 }
//             }
//         }
//     }
// });

const Court = (props) => {
    const players = props.players
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState({ });
    const [schedulingPlayers, setSchdulingPlayers] = useState([]);
    const [image, setImage] = useState('/images/players/Djokovic.jpg')
    const [rownum, setRownum] = useState(0);
    const [timeLength, setTimeLength] = useState(2);
    const headerColor = props.headerColor
    const name = props.name
    const booking = props.booking

    const flatProps = {
        options: players.map((option) => option.name),
    };

    useEffect(() => { 
            players.length > 0 && setSelectedPlayer(players[0])

            if (players.length > 0) {
                const lastname = players[0].name.split(' ')
                setImage('/images/players/' + lastname[lastname.length - 1] + '.jpg')
            }
        }, [ players ])

    const closeDialog = () => {
        setSchdulingPlayers([])
        setOpenDialog(false)
    }

    const open_Dialog = (index) => {
        setRownum(index)
        setOpenDialog(true)
    }

    const onChangePlayer = (event, newValue) => {
        if (players.length !== 0) {

            if(newValue !== null) {
                setSelectedPlayer(players.find(player => player.name === newValue))
                
                const lastname = newValue.split(' ')
                setImage('/images/players/' + lastname[lastname.length - 1] + '.jpg')
            }
        }
    }

    const onSchedule = () => {
        const initialDate = new Date(props.bookingDate);
        const newDate = new Date(initialDate.getTime() + rownum * 30 * 60 * 1000); // start time : calculated by row(time is 
           // increased 30mins row by row, so...)

        const data = {
            court_name: name,
            booker: 'Admin',
            start_time: newDate,
            time_slot: timeLength,  // 30 mins * time length
            reservation_type: 'Practice',
            players: schedulingPlayers
        }

        props.createBook(data)

    }

    const addPlayer = () => {  // + button
        if (schedulingPlayers.length === 0) {
            setSchdulingPlayers([...schedulingPlayers, selectedPlayer.name])

            return
        } else if(schedulingPlayers.length === 4) {
            alert('You can book 4 players at max!')
            return
        }
        
        let bFound = schedulingPlayers.find(element => element === selectedPlayer.name)

        if (!bFound) {
            setSchdulingPlayers([...schedulingPlayers, selectedPlayer.name])
        }
    }

    const onChangeTimeLength = (event) => {
        setTimeLength(event.target.value)
    }

    return(
        <>
        <Box>
            <Box
                backgroundColor={headerColor}
                padding={2}
                sx={{
                   position: 'sticky',
                   top: 0,
                   zIndex: 1
                }}
            >
                <StadiumIcon 
                    sx = {{
                        'verticalAlign' : "bottom"
                    }} 
                />
                <strong> &nbsp; { name }</strong>
            </Box>
            {
                booking.map((book, index) => (
                <Box
                    sx={{
                        backgroundColor: `${ !book.isBooked ?'#343434' : '#606060'}`,
                        paddingTop: 2,
                        border: 'solid 2px #a0a0a0',
                        color: 'white',
                        height: 280
                    }}
                    key={index}
                >
                    {
                        book.isBooked ? 
                        <Typography variant='h5' ml={4}>Match Warm - Up</Typography>
                        :
                        <Typography variant='h5' ml={4}>Available </Typography>
                    }
                    <Typography variant='h6' ml={4} mt={1}>{ book.startTime } - { book.endTime } </Typography>
                    {   book.isBooked 
                        ?
                    <Box my={3.5} textAlign='center'>
                        { book.booker } <br/><br/> { book.player }
                    </Box> 
                        :
                    <Box my={3.5} textAlign='center'>
                        <Button fullWidth variant='contained' onClick={ () => { open_Dialog(index) } }
                            sx={{
                                color: 'white',
                                backgroundColor: 'primary.accent',
                                paddingTop: 2, 
                                paddingBottom: 2,
                                width: '95%',
                                marginTop: 2,
                            }}
                        >
                            SCHEDULE
                        </Button>
                    </Box>
                    }
    
                    <Typography pl={3} pb={3} variant='h6' color='white' >
                        <Grid container alignItems="center" spacing={1}>
                            {
                                book.isBooked ? 
                                <Grid item xs={6} color='white'>
                                    <span>comments</span>
                                </Grid> :
                                <Grid item xs={6} color='secondary.text'>
                                    <span>comments</span>
                                </Grid> 
                            }
                            
                            <Grid item>
                                <FavoriteIcon/>
                            </Grid>
                            <Grid item>
                                <ShareIcon />
                            </Grid>
                            <Grid item>
                                <BookmarkIcon />
                            </Grid>
                        </Grid>
                    </Typography>
                </Box>
                ))
            }

        </Box>
        <Dialog open={openDialog} maxWidth='sm' fullWidth
                PaperProps={{
                    style:{
                        backgroundColor:"#e0e0e0",
                    }
                }}
            >
                <DialogTitle fontWeight={700} marginTop={2}>ADD SCHEDULING</DialogTitle>
                <DialogContent>
                    <Stack spacing={1} sx={{ width: '50%' }}>
                        <Autocomplete
                            {...flatProps}
                            id="controlled-demo"
                            value={selectedPlayer.name}
                            onChange={onChangePlayer}
                            renderInput={(params) => (
                                <TextField {...params} label="Players" variant="standard" />
                            )}
                        />
                    
                    </Stack>
                    <Typography marginTop={3} variant='h5'>
                        { selectedPlayer.name}
                    </Typography>
                    <span style={{marginBottom : '10vh'}}>Seeded: {selectedPlayer.tournament_seed}</span>

                    <Grid container paddingLeft={1}>
                        <Grid item xs={6}>
                            <Typography marginTop={3} variant='h6'>
                                <span style={{ color: 'red', marginRight: 30}}>
                                    { selectedPlayer.natl }
                                </span>
                                <WorldFlag countryCode={alpha3ToAlph2[selectedPlayer.natl]} svg style={{ width: '1.5em', height: '1.5em' }} />
                                <br/>
                                Handiness: { selectedPlayer.right_handed ? 'Right' : 'Left' } <br />
                            </Typography>
                            <Typography color='brown' variant='h6'>
                                Status: { selectedPlayer.status}
                            </Typography>
                            <Typography color='blue' variant='h6'>
                                { selectedPlayer.atp_wta}
                            </Typography>
                            <Typography color='green' variant='h6'>
                                { selectedPlayer.singles_in ? 'Singles In' : 'Singles Out'}
                            </Typography>
                            <Typography color='red' variant='h6'>
                                { selectedPlayer.doubles_in ? 'Doubles In' : 'Doubles Out'}
                            </Typography>
                            <Typography color='brown' variant='h6'>
                                { props.name } 10:00 - 11:00
                            </Typography>
                            <FormControl variant="filled" sx={{ minWidth: 120, marginTop: 2, marginBottom: 2 }} >
                                <InputLabel id="demo-simple-select-filled-label">Time Length</InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={timeLength}
                                    onChange={onChangeTimeLength}
                                    label='timeLength'
                                >
                                    <MenuItem value={2}>2 (1 hour)</MenuItem>
                                    <MenuItem value={1}>1 (30 mins)</MenuItem>
                                    <MenuItem value={4}>4 (2 hour)</MenuItem>
                                </Select>
                            </FormControl>
                            <Box sx={{ padding: 2, paddingBottom: 3, marginTop: 2, marginRight: 2, backgroundColor:'primary.main', borderRadius: 1.5 }}>
                                
                                <Typography color='white' variant='h6' textAlign='center'>SELECT PLAYERS:</Typography>
                                {
                                    schedulingPlayers.map((player, index) => (
                                        <Box marginTop={1} key={index} sx={{ color: 'white', padding: 1 }}>
                                            { player }
                                        </Box>
                                    ))
                                }
                            </Box>

                        </Grid>
                        <Grid item xs={6}>
                            <ImageCard 
                                image_Url={image}
                                title={selectedPlayer.name}
                            />                         
                        </Grid>
                    </Grid>      
                    
                    <Stack direction='row' spacing={1} sx={{float: 'right'}}>
                        <IconButton onClick={addPlayer}>
                            <AddCircleOutlineIcon aria-label='add' sx={{ color: 'red' }}/>
                        </IconButton>
                        <IconButton>
                            <RemoveCircleOutlineIcon color='secondary'/>
                        </IconButton>
                    </Stack>            

                </DialogContent>
                <DialogActions sx={{ paddingRight: 3, paddingBottom: 3 }}>
                    <Button onClick={closeDialog} variant='contained'>Close</Button>
                    <Button onClick={onSchedule} variant='contained'>Schedule</Button>
                </DialogActions>
        </Dialog>
        </>
    )
}


const mapDispatchToProps = (dispatch) => ({
    createBook: (data) => dispatch(createBook(data))
})

const mapStateToProps = (state) => ({
    bookingDate: state.booking.bookingDate
})

export default connect(mapStateToProps, mapDispatchToProps)(Court);