"use client";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";

const drawerWidth = 240;

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: "rgb(30, 41, 59)",
          color: "white",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Image
          src={
            "https://ik.imagekit.io/prbjdtauk2z/Screenshot%202025-02-15%20at%2017.17.48_pugQsg-mm.png?updatedAt=1739614732671"
          }
          width={170}
          height={60}
          alt="Logo"
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="overline" sx={{ px: 2, color: "grey.500" }}>
          MENU
        </Typography>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} href="/invoices/add">
              <ListItemIcon sx={{ color: "white" }}>
                <Add />
              </ListItemIcon>
              <ListItemText primary="Add Invoice" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} href="/invoices/list">
              <ListItemIcon sx={{ color: "white" }}>
                <ViewListRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="My Invoices" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
