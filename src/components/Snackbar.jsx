import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Snackbar, Alert } from "@mui/material";
import Slide from "@mui/material/Slide";

const SnackbarComp = ({ message, position }) => {
  const [open, setOpen] = useState(false);

  // Automatically open Snackbar when there's an error
  useEffect(() => {
    if (message?.content) {
      setOpen(true);
    }
  }, [message]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function SlideTransition(props) {
    return (
      <Slide
        {...props}
        direction={position?.vertical == "bottom" ? "up" : "down"}
      />
    );
  }

  return (
    <div className="w-full">
      <Snackbar
        open={open}
        onClose={handleClose}
        anchorOrigin={position || { vertical: "bottom", horizontal: "center" }}
        TransitionComponent={(props) => (
          <SlideTransition {...props} position={position} />
        )}
        autoHideDuration={6000}
        sx={{ maxWidth: "500px", width: "80%" }}
      >
        <Alert
          onClose={handleClose}
          severity={message?.type || "error"}
          sx={{ width: "100%" }}
        >
          {message?.content}
        </Alert>
      </Snackbar>
    </div>
  );
};

SnackbarComp.propTypes = {
  message: PropTypes.object.isRequired,
  position: PropTypes.object,
};

export default SnackbarComp;
