import { useCallback, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { type IUserData } from "../types";
import { CircularProgress } from "@mui/material";

interface DeleteDialogProps {
  userToDelete: IUserData | undefined;
  onClose: () => void;
}

const DeleteDialog = ({ userToDelete, onClose }: DeleteDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = useCallback(async () => {
    setIsLoading(true);

    const res = await fetch(`https://reqres.in/api/users/${userToDelete?.id}`, {
      method: "DELETE",
    });

    if (res.status === 204) {
      onClose();
      // Wait for closing animation to end
      await new Promise((r) => setTimeout(r, 500));
    }

    setIsLoading(false);
  }, [onClose, userToDelete?.id]);

  return (
    <Dialog open={!!userToDelete} onClose={isLoading ? () => void 0 : onClose}>
      <DialogTitle>Delete User</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete user?
          <br />"{userToDelete?.email}"
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={isLoading}
          onClick={isLoading ? () => void 0 : onClose}
        >
          No
        </Button>
        <Button disabled={isLoading} onClick={handleDelete} autoFocus>
          Yes {isLoading && <CircularProgress size={15} sx={{ ml: 1 }} />}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
