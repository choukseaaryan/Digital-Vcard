import React from "react";
import "./ModalComponent.css";
import Button from '@mui/material/Button';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import EmailModal from './EmailModal';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalComponent({ data }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button className="dbtn" onClick={handleClickOpen}>
        Download VCard
      </Button>
      <Button className="fbtn" onClick={handleClickOpen}>
        Download VCard
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Save VCard"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Button href={`http://localhost:3003/VCards/${data.employee_id}.vcf`} variant="outline">Download Vcard</Button>
            <EmailModal />
            <Button variant="outline" href={`mailto:?subject=${data.first_name} ${data.last_name}'s vCard&body=Follow this link to download ${data.first_name} ${data.last_name}'s vCard: http://localhost:3003/VCards/${data.employee_id}.vcf`}>
              Send from your Email
            </Button>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
