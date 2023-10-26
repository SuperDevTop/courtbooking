import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function ConfirmationDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Reservation</DialogTitle>
      <DialogContent sx={{ display: "flex", alignItems: "center" }}>
        <DeleteIcon sx={{ color: 'red' }}/>
        Are you sure you want to delete this reservation?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="outlined" sx={{ textTransform:"none" }}>
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary" variant="outlined" sx={{ textTransform:"none" }}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;
