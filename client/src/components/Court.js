import { Box, Button, Typography, Grid } from '@mui/material';
import React from 'react';
import StadiumIcon from '@mui/icons-material/Stadium';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { TextField } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from '@mui/material/Autocomplete';

import ImageCard from '../components/ImageCard';

const image = {
    'imageUrl': '/images/1.jpg',
    'title': 'Player'
}

let playerNames = [];

const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: '#0ef05d'
                }
            }
        }
    }
});


function Playground() {

    const flatProps = {
        options: playerNames.map((option) => option.name),
      };

    const [player, setValue] = useState(null);
  
    return (
      <Stack spacing={1} sx={{ width: 300 }}>
        
        <Autocomplete
          {...flatProps}
          id="controlled-demo"
          value={player}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Players" variant="standard" />
          )}
        />
       
      </Stack>
    );
  }
  

// function SearchBar() {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [matchedPlayers, setMatchedPlayers] = useState([]);
  
//     const handleChange = (event) => {
//       const { value } = event.target;
//       setSearchTerm(value);
  
//       const matched = playerNames.filter((player) =>
//         player.toLowerCase().includes(value.toLowerCase())
//       );
  
//       setMatchedPlayers(matched);
  
//       if (value === "") {
//         setMatchedPlayers([])
//       }
//     };

//     const onSelectedPlayer = (event) => {
//         alert(event.target.value)
//     }
  
//     return (
//       <Box>
//         <TextField
//           id="search"
//           type="search"
//           label="Search"
//           value={searchTerm}
//           sx={{
//             marginTop: 1,
//             width: '70%'
//           }}
//           onChange={handleChange}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />
//         <Box width={'62.5%'} sx={{ 
//             position: 'absolute',
//          }}>
//         {
//           matchedPlayers.map((player, index) => (
//             <Box
//               key={index}
//               sx={{
//                 backgroundColor: "#f5f5f5",
//                 padding: "8px",
//               }}

//               onClick={onSelectedPlayer}
//             >
//               { player }
//             </Box>
//           ))
//         }
//         </Box>
//       </Box>
//     );
//   }

const Court = (props) => {

    const [openDialog, setOpenDialog] = useState(false);

    // playerNames = props.players.map((player) => player.name);
    playerNames = props.players
    console.log(playerNames);

    const closeDialog = () => {
        setOpenDialog(false)
    }

    const open_Dialog = () => {
        setOpenDialog(true)
    }

    const headerColor = props.headerColor
    const title = props.title
    const booking = props.booking

    const players = [];
    const [player, setPlayer] = useState('');

    const changePlayer = (e) => {
        setPlayer(e.target.value)
        players[0] = player
    }

    return(
        <ThemeProvider theme={theme}>
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
                <StadiumIcon sx={{
                    'verticalAlign' : "bottom"
                }} />
                &nbsp; { title }
            </Box>
            {
                booking.map((book, index) => (
                <Box
                    sx={{
                        backgroundColor: '#2f2f2f',
                        paddingTop: 2,
                        border: 'solid 2px #a0a0a0',
                        color: 'white',
                        height: 280
                    }}
                    key={index}
                >
                    {
                        book.isBooked ? 
                        <Typography variant='h5' ml={4}>Match Warm - Up </Typography> :
                        <Typography variant='h5' ml={4}>Available </Typography>
                    }
                    <Typography variant='h6' ml={4} mt={1}>{book.startTime} - {book.endTime} </Typography>
                    {   book.isBooked 
                        ?
                    <Box my={3.5} textAlign={'center'}>
                        {book.booker} <br/><br/> {book.player}
                    </Box> 
                        :
                    <Box my={3.5} textAlign={'center'}>
                        <Button fullWidth variant='contained' onClick={open_Dialog}
                            sx={{
                                color: 'white',
                                backgroundColor: 'primary.dark',
                                paddingTop: 2, 
                                paddingBottom: 2,
                                width: '95%',
                                marginTop: 2
                            }}
                        >
                            SCHEDULE
                        </Button>
                    </Box>
                    }
    
                    <Typography pl={3} pb={3} variant='h6' color={'white'} >
                        <Grid container alignItems="center" spacing={1}>
                            <Grid item xs={6} color={"#1976d2"}>
                                <span>comments</span>
                            </Grid>
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
                    {/* <SearchBar /> */}
                    <Playground />
                    <Typography marginTop={3} variant='h5'>
                        Roger Federer
                    </Typography>
                    <span style={{marginBottom : '10vh'}}>Seeded: 5</span>

                    <Grid container paddingLeft={1}>
                        <Grid item xs={6}>
                            <Typography marginTop={3} variant='h6'>
                                <span style={{ color: 'red'}}>Canada</span><br></br>
                                Handiness: Right <br></br>
                                Rank: 5
                            </Typography>
                            <Typography color={'green'} variant='h6' marginTop={5}>
                                Singles In
                            </Typography>
                            <Typography color={'red'} variant='h6'>
                                Doubles Out
                            </Typography>
                            <Typography color={'brown'} variant='h6'>
                                Stadium 10:00 - 11:00
                            </Typography>
                            <Typography color={'blue'} variant='h6'>
                                Court1 13:00 - 13:30
                            </Typography>
                            <Typography variant='h6'>
                                Stadium [Match #3]
                            </Typography>
                            <Typography variant='h6'>
                                R.Federer vs L.Minniti
                            </Typography>
                            
                        </Grid>
                        <Grid item xs={6}>
                            <ImageCard image={image}/>                            
                        </Grid>
                    </Grid>      
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 525, marginTop: 2 }}>
                        <InputLabel id="demo-simple-select-filled-label">Pick Player</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={player}
                            onChange={changePlayer}
                        >
                            <MenuItem value={1}>Andrey Rublev</MenuItem>
                            <MenuItem value={2}>Karen Kachanov</MenuItem>
                            <MenuItem value={3}>Dialog Schwartzman</MenuItem>
                            <MenuItem value={4}>Rafael Nadal</MenuItem>
                        </Select>
                    </FormControl>  
                    
                    <Stack direction='row' spacing={1} sx={{float: 'right'}}>
                        <IconButton>
                            <AddCircleOutlineIcon aria-label='add' color='primary'/>
                        </IconButton>
                        <IconButton>
                            <RemoveCircleOutlineIcon color='secondary'/>
                        </IconButton>
                    </Stack>            

                </DialogContent>
                <DialogActions sx={{paddingRight: 5, paddingBottom: 3}}>
                    <Button onClick={closeDialog} variant='contained'>Close</Button>
                    <Button onClick={closeDialog} variant='contained'>Schedule</Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    )
}

export default Court;