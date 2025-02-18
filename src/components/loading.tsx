import React from "react";
import { CircularProgress, Backdrop } from "@mui/material";

interface LoadingDialogProps {
  open: boolean;
}

const LoadingDialog: React.FC<LoadingDialogProps> = ({ open = false }) => {
  const [openIs, setIsOpen] = React.useState(open);
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={openIs}
      onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingDialog;
