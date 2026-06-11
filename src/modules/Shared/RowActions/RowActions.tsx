import {IconButton,ListItemIcon,Menu,MenuItem,Tooltip} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import { useState } from "react";

interface RowActionsProps {
  showView?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function RowActions({ showView = false, showEdit = false, showDelete = false, onView, onEdit, onDelete}: RowActionsProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Options">
        <IconButton size="small" onClick={handleOpen}>
          <MoreHorizIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              borderRadius: "15px",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              minWidth: 180,

              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
      >
        {showView && (
          <MenuItem onClick={onView}>
            <ListItemIcon>
              <VisibilityOutlinedIcon
                fontSize="small"
                sx={{ color: "#203FC7" }}
              />
            </ListItemIcon>
            View
          </MenuItem>
        )}

        {showEdit && (
          <MenuItem onClick={onEdit}>
            <ListItemIcon>
              <EditOutlinedIcon fontSize="small" sx={{ color: "#203FC7" }} />
            </ListItemIcon>
            Edit
          </MenuItem>
        )}

        {showDelete && (
          <MenuItem onClick={onDelete}>
            <ListItemIcon>
              <DeleteOutlinedIcon fontSize="small" sx={{ color: "#203FC7" }} />
            </ListItemIcon>
            Delete
          </MenuItem>
        )}
      </Menu>
    </>
  );
}
