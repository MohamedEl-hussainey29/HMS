import {Button,Dialog,DialogActions,DialogContent,DialogTitle,Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface AuthRequiredDialogProps {
  open: boolean;
  onClose: () => void;
  action?: string;
}

export default function AuthRequiredDialog({open,onClose,action = "continue"}: AuthRequiredDialogProps) {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/auth/login");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Login Required</DialogTitle>

      <DialogContent>
        <Typography>
          You need to log in before you can {action}.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
}