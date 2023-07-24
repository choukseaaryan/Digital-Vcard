import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outline" onClick={handleClickOpen}>
        Send to Email
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Send to Email</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Send the VCard to your email:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="recipient-email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Send</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
