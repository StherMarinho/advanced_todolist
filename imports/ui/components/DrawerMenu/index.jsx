//menu lateral
import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer,List,ListItem,ListItemButton, ListItemText,ListItemIcon, IconButton,Toolbar,Typography,Box, Divider } from '@mui/material';
import { Menu as MenuIcon, Home, Task, Dashboard, Person } from '@mui/icons-material';

const drawerWidth = 200;
const collapsedWidth = 72;

const DrawerMenu = ({ open, setOpen }) => {

    const menuItems = [
        {
            text: "Home",
            icon: <Home />,
            path: "/home"
        },
        {
            text: "Tarefas",
            icon: <Task />,
            path: "/tasks"
        },
        {
            text: "Perfil",
            icon: <Person />,
            path: "/profile"
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
                    transition: "0.2s"
                }
            }}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: open ? "flex-end" : "center"
                }}
            >
                <IconButton 
                    onClick={() => setOpen(!open)}
                    disableRipple
                    sx={{
                        "&:hover":{
                            backgroundColor: "white"
                        }
                    }}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>

            <Divider />

            <List>
                {
                    menuItems.map((item) => (
                        <ListItem
                            key={item.text}
                            disablePadding
                        >
                            <ListItemButton
                                component={Link}
                                to={item.path}
                                sx={{
                                    display: "flex",
                                    justifyContent: open ? "initial" : "center",
                                }}
                            >
                                <ListItemIcon>
                                    {item.icon}
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