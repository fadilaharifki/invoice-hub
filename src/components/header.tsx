"use client";
import {
  AppBar,
  Avatar,
  Badge,
  BadgeProps,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  NotificationsOutlined,
  ChatOutlined,
  ExpandMoreRounded,
} from "@mui/icons-material";
import { styled } from "@mui/system";
import CustomToggle from "./custom-switch";
import { useState } from "react";
import stringAvatar from "@/utils/initialName";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "4px",
    borderRadius: 10,
  },
}));

export default function Header() {
  const [checked, setChecked] = useState(false);
  const user = "John Doe";
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{
        background: "white",
        borderBottom: "1px solid",
        borderColor: "grey.200",
      }}
    >
      <Toolbar sx={{ justifyContent: "flex-end", gap: 2 }}>
        <CustomToggle
          checked={checked}
          onChange={() => {
            setChecked(!checked);
          }}
        />
        <IconButton sx={{ background: "#EFF4FC" }} size="small">
          <NotificationsOutlined />
        </IconButton>
        <StyledBadge
          overlap="circular"
          badgeContent=" "
          variant="dot"
          color="error"
        >
          <IconButton sx={{ background: "#EFF4FC" }} size="small">
            <ChatOutlined />
          </IconButton>
        </StyledBadge>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
            }}
          >
            <Typography variant="body2">{user}</Typography>
            <Typography variant="caption" color="text.secondary">
              Verified Member
            </Typography>
          </Box>
          <Avatar {...stringAvatar(user)}></Avatar>
        </Box>
        <IconButton size="small">
          <ExpandMoreRounded />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
