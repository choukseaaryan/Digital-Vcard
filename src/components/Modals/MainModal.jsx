import React from "react";
import "./ModalComponent.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import EmailModal from './EmailModal';

export default function ModalComponent() {
  // const [isOpen, setIsOpen] = useState(false);

  // const openModal = () => {
  //   setIsOpen(true);
  // };

  // const closeModal = () => {
  //   setIsOpen(false);
  // };

  // const openModal1 = () => {
  //   // Logic to open modal 1
  // };

  // const openModal2 = () => {
  //   // Logic to open modal 2
  // };

  // const openModal3 = () => {
  //   // Logic to open modal 3
  // };

  return (
    <div>
      {AlertDialogSlide()}

      {/* <button onClick={openModal} className="dbtn">
          Download VCard
        </button>
  
        {isOpen && (AlertDialogSlide())} */}

      {/* Render additional modals based on your requirements */}
      {/* Add logic to display different modal components */}
    </div>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AlertDialogSlide() {
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
            <Button href="https://media.qrtiger.com/vcard/O5AR.vcf" variant="outline">Download Vcard</Button>
            <EmailModal />
            <Button variant="outline" href="mailto:?subject=Kamlesh Kumar's%20vCard&amp;body=Follow%20this%20link%20to%20download%20Kamlesh Kumar's%20vCard%3A https://media.qrtiger.com/vcard/O5AR.vcf">
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
