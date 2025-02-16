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
import CustomToggle from "./invoices/customSwitch";
import { useState } from "react";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "4px",
    borderRadius: 10,
  },
}));

export default function Header() {
  const [checked, setChecked] = useState(false);
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
            <Typography variant="body2">John Doe</Typography>
            <Typography variant="caption" color="text.secondary">
              Verified Member
            </Typography>
          </Box>
          <Avatar sx={{ width: 32, height: 32 }}>JD</Avatar>
        </Box>
        <IconButton size="small">
          <ExpandMoreRounded />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
