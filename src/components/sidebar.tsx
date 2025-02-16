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
import { usePathname } from "next/navigation";

const drawerWidth = 240;

const menuItems = [
  {
    label: "Add Invoice",
    href: "/invoices/add",
    icon: (color: string) => <Add sx={{ color: color }} />,
  },
  {
    label: "My Invoices",
    href: "/invoices/list",
    icon: (color: string) => <ViewListRoundedIcon sx={{ color: color }} />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

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
          src="https://ik.imagekit.io/prbjdtauk2z/Screenshot%202025-02-15%20at%2017.17.48_pugQsg-mm.png?updatedAt=1739614732671"
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
          {menuItems.map((menu) => (
            <ListItem key={menu.href} disablePadding>
              <ListItemButton
                component={Link}
                href={menu.href}
                sx={{
                  color: pathname === menu.href ? "white" : "grey.600",
                  "&:hover": { bgcolor: "grey.500" },
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  {menu.icon(pathname === menu.href ? "white" : "grey.600")}
                </ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
