import { Box, Button, Typography, Grid, MenuItem } from "@mui/material";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { connect } from "react-redux";
import { Select } from "@mui/material";
import { FormControl, InputLabel } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";

import { updateBook } from "../../actions/bookingAction";
import CustomAlert from "../CustomAlert";
import ChipsWithCloseButton from "../ChipsWithCloseButton";

const EditDialog = ({ open, close, data, updateBook }) => {
  const [timeLength, setTimeLength] = useState(2);
  const [warmupCheckedCount, setWarmupCheckedCount] = useState(0);
  const [chip, setChip] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false)

  useEffect(() => {
    if (data.hasOwnProperty('players')) {
      setChip(data.players)
      setTimeLength(data.time_slot)
    }
  }, [data])

  // Save edited reservation
  const onSave = () => {
    let reservation_type = 'Practice'

    if (warmupCheckedCount > 0) {
      reservation_type = 'Warm Up'
    }

    const dat = {
      id: data._id,
      time_slot: timeLength,
      players: chip,
      reservation_type: reservation_type
    }

    updateBook(dat, updateSuccess)
  };

  const handleWarmupCheck = (value) => {
    if (value === true) {
      setWarmupCheckedCount(warmupCheckedCount + 1)
    } else {
      setWarmupCheckedCount(warmupCheckedCount - 1)
    }
  }

  const onChangeTimeLength = (event) => {
    setTimeLength(event.target.value);
  };

  const handleDeleteChip = (chipToDelete) => {
    setChip(chip.filter((one) => one !== chipToDelete))
  }

  const onClose = () => {
    setChip(data.players)
    setAlertOpen(false)
    close();
  }

  const updateSuccess = () => {
    setAlertOpen(true)
    setTimeout(() => {
      window.location.reload()
    }, 1000);
  }

  return (
    <Dialog
      open={open}
      maxWidth="sm"
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
          <Grid item xs={3}>
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
          <Grid item xs={9}>
            <Box sx={{ marginRight: 2, borderRadius: 1.5, marginLeft:2 }}>
              <Typography color="black" variant="h6" textAlign="center" marginBottom={2}>
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
  updateBook:(data, callback) => dispatch(updateBook(data, callback))
})

export default connect(null, mapDispatchToProps) (EditDialog);
