//menu lateral
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import { Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon, IconButton, Toolbar, Typography, Box, Divider, Avatar, Tooltip } from "@mui/material";

import { Menu as MenuIcon, Home, Task, Person, Logout } from "@mui/icons-material";

const drawerWidth = 200;
const collapsedWidth = 72;

const DrawerMenu = ({ open, setOpen }) => {

    const user = useTracker(() => Meteor.user());
    const navigate = useNavigate();

    const menuItems = [
    {
        text: "Home",
        icon: (open) => (
            <Tooltip title={!open ? "Home" : ""} placement="right" arrow>
                <Home />
            </Tooltip>
        ),
        path: "/home"
    },
    {
        text: "Tarefas",
        icon: (open) => (
            <Tooltip title={!open ? "Tarefas" : ""} placement="right" arrow>
                <Task />
            </Tooltip>
        ),
        path: "/tasks"
    },
    {
        text: "Perfil",
        icon: (open) => (
            <Tooltip title={!open ? "Perfil" : ""} placement="right" arrow>
                <Person />
            </Tooltip>
        ),
        path: "/profile"
    },
    {
        text: "Logout",
        icon: (open) => (
            <Tooltip title={!open ? "Logout" : ""} placement="right" arrow>
                <Logout />
            </Tooltip>
        ),
        action: () => Meteor.logout(() => {
            navigate("/login");
        })
    }
];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: open ? drawerWidth : collapsedWidth,
                flexShrink: 0,

                "& .MuiDrawer-paper": {
                    width: open ? drawerWidth : collapsedWidth,
                    boxSizing: "border-box",
                    transition: "0.2s",
                    overflowX: "hidden"
                }
            }}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: open ? "flex-end" : "center"
                }}
            >
                <Tooltip title={open ? "Fechar Menu" : "Abrir Menu"}>
                    <IconButton
                        onClick={() => setOpen(!open)}
                        disableRipple
                        sx={{
                            "&:hover": {
                                backgroundColor: "#f8fafc"
                            }
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Tooltip>
            </Toolbar>

            <Divider />

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    py: 3,
                    px: 1
                }}
            >
                <Avatar
                    src={user?.profile?.photo || ""}
                    sx={{
                        width: open ? 80 : 45,
                        height: open ? 80 : 45,
                        mb: 1
                    }}
                />

                {
                    open && (
                        <>
                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                
                                sx={{
                                    textAlign: "center"
                                }}
                            >
                                {user?.profile?.name || "Usuário"}
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    textAlign: "center"
                                }}
                            >
                                {user?.emails?.[0]?.address || ""}
                            </Typography>
                        </>
                    )
                }
            </Box>

            <Divider />

            <List>
                {
                    menuItems.map((item) => (
                        <ListItem
                            key={item.text}
                            disablePadding
                        >
                            <ListItemButton
                                // component={Link}
                                onClick={item.action}
                                component={item.path ? Link : "button"}
                                to={item.path}
                                sx={{
                                    display: "flex",
                                    justifyContent: open ? "initial" : "center",
                                    px: 2.5
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 2 : "auto",
                                        justifyContent: "center"
                                    }}
                                >
                                    {item.icon(open)}
                                </ListItemIcon>

                                {
                                    open &&
                                    <ListItemText primary={item.text} />
                                }
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
        </Drawer>
    );
};

export default DrawerMenu;