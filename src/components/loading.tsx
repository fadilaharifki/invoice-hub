import React from "react";
import { Dialog, DialogContent, CircularProgress } from "@mui/material";

interface LoadingDialogProps {
  open: boolean;
}

const LoadingDialog: React.FC<LoadingDialogProps> = ({ open }) => {
  return (
    <Dialog open={open} disableEscapeKeyDown>
      <DialogContent
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress />
      </DialogContent>
    </Dialog>
  );
};

export default LoadingDialog;
