import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Grid,
  TextField,
  Autocomplete,
  RadioGroup,
  Radio,
  FormLabel,
  FormControl,
} from "@mui/material";
import { FormControlLabel } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { connect } from "react-redux";

import { addComment, deleteComment } from "../../actions/bookingAction";
import CustomAlert from "../CustomAlert";
import ConfirmDialog from "../reservation/confirmDialog";
import LoadingOverlay from "../layout/LoadingOverlay";

const CommentsDialog = ({
  open,
  onClose,
  players,
  user,
  addComment,
  bookingId,
  comments,
  deleteComment,
}) => {
  const [flatoptions, setFlatoptions] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [content, setContent] = useState("");
  const [openCustomalert, setOpenCustomalert] = useState(false);
  const [openWarningAlert, setOpenWarningAlert] = useState(false);
  const [openCommentDeleteAlert, setOpenCommentDeleteAlert] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [dataToBeDeleted, setDataToBeDeleted] = useState({
    commentId: "",
    bookingId: "",
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const flatOptionProps = {
    options: flatoptions,
  };
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [type, setType] = useState("permanent");

  useEffect(() => {
    setFlatoptions(players);
  }, [players]);

  useEffect(() => {
    setCommentData(comments);
  }, [comments]);

  const onPlayerChange = (event, value) => {
    setSelectedPlayer(value);
  };

  const handleTypeChange = (event, value) => {
    setType(value);
  };

  const isOptionEqualToValue = (option, value) => {
    return option.value === value.value;
  };

  const onSave = async () => {
    if (content === "") {
      setOpenWarningAlert(true);

      setTimeout(() => {
        setOpenWarningAlert(false);
      }, 2000);

      return;
    }
    const data = {
      booker: user.name,
      player: selectedPlayer,
      content: content,
      type: type === "permanent" ? true : false,
      id: bookingId,
    };
    await addComment(data);
    setOpenCustomalert(true);

    setTimeout(() => {
      onClose();
      setOpenCustomalert(false);
    }, 2000);
  };

  const onDelete = async (row) => {
    const data = { commentId: row._id, bookingId: bookingId };
    setDataToBeDeleted(data);
    setOpenConfirmDialog(true);
  };

  const onDeleteConfirm = async () => {
    setIsDeleting(true);
    setOpenConfirmDialog(false);
    await deleteComment(dataToBeDeleted);
    setIsDeleting(false);
    console.log(isDeleting);
    setOpenCommentDeleteAlert(true);

    setTimeout(() => {
      setOpenCommentDeleteAlert(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle textAlign="center">Comments</DialogTitle>
      <DialogContent sx={{ display: "flex", alignItems: "center" }}>
        <Grid container>
          <Grid item xs={4}>
            <Stack spacing={1}>
              <Autocomplete
                {...flatOptionProps}
                value={selectedPlayer}
                onChange={onPlayerChange}
                isOptionEqualToValue={isOptionEqualToValue}
                renderInput={(params) => (
                  <TextField {...params} label="Players" variant="standard" />
                )}
              />
            </Stack>
            <FormControl sx={{ my: 2 }}>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Type
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={type}
                onChange={handleTypeChange}
                row
              >
                <FormControlLabel
                  value="permanent"
                  control={<Radio />}
                  label="Permanent"
                />
                <FormControlLabel
                  value="reservation"
                  control={<Radio />}
                  label="Reservation"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              id="outlined-multiline-static"
              label="Content"
              multiline
              rows={5}
              fullWidth
              value={content}
              required
              onChange={(event) => {
                setContent(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={8} pl={2}>
            <TableContainer
              component={Paper}
              sx={{ marginTop: 1.5, maxHeight: 285, minHeight: 285 }}
            >
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="right">Booker</TableCell>
                    <TableCell align="right">Content</TableCell>
                    <TableCell align="right">Player</TableCell>
                    <TableCell align="right">Type</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {commentData.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="right">{row.booker}</TableCell>
                      <TableCell align="right">{row.content}</TableCell>
                      <TableCell align="right">{row.player}</TableCell>
                      <TableCell align="right">
                        {row.isPermanent ? "Permanent" : "Reservation"}
                      </TableCell>
                      <TableCell align="right">
                        <DeleteIcon
                          sx={{ color: "red" }}
                          onClick={() => {
                            onDelete(row);
                          }}
                        />
                        <EditIcon sx={{ color: "greenyellow" }} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onSave}
          color="primary"
          variant="outlined"
          sx={{ textTransform: "none", margin: 1 }}
        >
          Save
        </Button>
        <Button
          onClick={onClose}
          color="primary"
          variant="outlined"
          sx={{ textTransform: "none", margin: 1.5 }}
        >
          Close
        </Button>
      </DialogActions>
      <CustomAlert
        openState={openCustomalert}
        text="The comment has been added successfully!"
        severity="success"
      />
      <CustomAlert
        openState={openWarningAlert}
        text="Please fill out all fields correctly!"
        severity="warning"
      />
      <CustomAlert
        openState={openCommentDeleteAlert}
        text="The comment has been removed successfully!"
        severity="success"
      />
      <ConfirmDialog
        open={openConfirmDialog}
        onClose={() => {
          setOpenConfirmDialog(false);
        }}
        onConfirm={onDeleteConfirm}
        title="Delete comment"
        text="Are you sure you want to delete this comment?"
      />
      {isDeleting && <LoadingOverlay text="Deleting..." color="success" />}
    </Dialog>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addComment: (data) => dispatch(addComment(data)),
  deleteComment: (data) => dispatch(deleteComment(data)),
});

const mapStateToProps = (state) => ({
  user: state.auth.user,
  comments: state.booking.comments,
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentsDialog);
