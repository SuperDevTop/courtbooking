import {
  Box,
  Button,
  Typography,
  Grid,
  MenuItem,
  TextField,
  Select,
} from "@mui/material";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { connect } from "react-redux";
import { FormControl, InputLabel } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { updateBook } from "../../actions/bookingAction";
import CustomAlert from "../CustomAlert";
import ChipsWithCloseButton from "../ChipsWithCloseButton";
import { currentPageToCourts } from "../../utils/currentPageToCourts";

const EditDialog = ({
  open,
  close,
  data,
  updateBook,
  players,
  currentPage,
  booking_date,
}) => {
  const [timeLength, setTimeLength] = useState(2);
  const [warmupCheckedCount, setWarmupCheckedCount] = useState(0);
  const [chip, setChip] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState("Marketa Vondrousova");
  const [maxPlayersCountWarning, setMaxPlayersCountWarning] = useState(false);
  const [noSelectWarning, setNoSelectWarning] = useState(false);
  const [bExistingUser, setExistingUser] = useState(false);

  const flatProps = {
    options: players.map((option) => option.name),
  };

  useEffect(() => {
    if (data.hasOwnProperty("players")) {
      setChip(data.players);
      setTimeLength(data.time_slot);
    }
  }, [data]);

  const onSave = () => {
    let reservation_type = "Practice";

    if (warmupCheckedCount > 0) {
      reservation_type = "Warm Up";
    }

    const { displayedCourtNames } = currentPageToCourts(currentPage);
    const dat = {
      id: data._id,
      time_slot: timeLength,
      players: chip,
      reservation_type: reservation_type,
      court_names: displayedCourtNames,
      date: booking_date,
    };

    updateBook(dat, updateSuccess);
  };

  const handleWarmupCheck = (value) => {
    if (value === true) {
      setWarmupCheckedCount(warmupCheckedCount + 1);
    } else {
      setWarmupCheckedCount(warmupCheckedCount - 1);
    }
  };

  const onChangeTimeLength = (event) => {
    setTimeLength(event.target.value);
  };

  const handleDeleteChip = (chipToDelete) => {
    setChip(chip.filter((one) => one !== chipToDelete));
  };

  const onClose = () => {
    setChip(data.players);
    setAlertOpen(false);
    close();
  };

  const updateSuccess = () => {
    setAlertOpen(true);
    
    setTimeout(() => {
      setAlertOpen(false);
      onClose()
    }, 2000);
  };

  const onChangePlayer = (event, newValue) => {
    setSelectedPlayer(newValue);
  };

  const addPlayer = () => {
    if (selectedPlayer === "") {
      setNoSelectWarning(true);

      setTimeout(() => {
        setNoSelectWarning(false);
      }, 2000);
      return;
    } else if (chip.length >= 4) {
      setMaxPlayersCountWarning(true);

      setTimeout(() => {
        setMaxPlayersCountWarning(false);
      }, 2000);
      return;
    }

    const bFound = chip.find((name) => name === selectedPlayer);

    if (!bFound) {
      setChip([...chip, selectedPlayer]);
    } else {
      setExistingUser(true);

      setTimeout(() => {
        setExistingUser(false);
      }, 2000);
    }
  };

  return (
    <Dialog
      open={open}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          backgroundColor: "#f0f0f0",
        },
      }}
    >
      <CustomAlert
        openState={alertOpen}
        text="The reservation has been updated successfully !"
        severity="success"
      />
      <CustomAlert
        openState={maxPlayersCountWarning}
        text="You can book 4 players at max !"
        severity="warning"
      />
      <CustomAlert
        openState={noSelectWarning}
        text="You must select one player at least !"
        severity="warning"
      />
      <CustomAlert
        openState={bExistingUser}
        text="The player already exists !"
        severity="warning"
      />
      <DialogTitle
        fontWeight={600}
        variant="h6"
        marginTop={2}
        marginBottom={3}
        textAlign="center"
        color="black"
      >
        <EditNoteIcon sx={{ verticalAlign: "text-bottom", marginRight: 1 }} />
        Edit reservation
        <EditNoteIcon sx={{ verticalAlign: "text-bottom", marginLeft: 1 }} />
      </DialogTitle>
      <DialogContent>
        <Grid container color="primary.info">
          <Grid item xs={5}>
            <Stack spacing={1}>
              <Autocomplete
                {...flatProps}
                id="controlled-demo"
                value={selectedPlayer}
                onChange={onChangePlayer}
                renderInput={(params) => (
                  <TextField {...params} label="Players" variant="standard" />
                )}
              />
            </Stack>
            <Button
              variant="contained"
              onClick={addPlayer}
              sx={{ marginTop: 2, marginBottom: 2 }}
            >
              <AddCircleOutlineIcon sx={{ marginRight: 1 }} />
              Add Player
            </Button>
            <br></br>
            <FormControl variant="filled" sx={{ minWidth: 120, marginTop: 2 }}>
              <InputLabel id="demo-simple-select-filled-label">
                Reservation Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={timeLength}
                onChange={onChangeTimeLength}
                label="timeLength"
              >
                <MenuItem value={2}>1 hr</MenuItem>
                <MenuItem value={1}>30 mins</MenuItem>
                <MenuItem value={4}>2 hrs</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={7}>
            <Box sx={{ marginRight: 2, borderRadius: 1.5, marginLeft: 2 }}>
              <Typography
                color="black"
                variant="h6"
                textAlign="center"
                marginBottom={2}
              >
                Selected Players:
              </Typography>
              <ChipsWithCloseButton
                chip={chip}
                handleDeleteChip={handleDeleteChip}
                handleWarmupCheck={handleWarmupCheck}
              />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ paddingRight: 3, paddingBottom: 3 }}>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
        <Button onClick={onSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateBook: (data, callback) => dispatch(updateBook(data, callback)),
});

const mapStateToProps = (state) => ({
  currentPage: state.page.currentPage,
  booking_date: state.booking.booking_date,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditDialog);
