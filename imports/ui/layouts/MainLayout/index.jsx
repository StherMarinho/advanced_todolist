import { Box } from "@mui/material";
import { useState } from "react";
import DrawerMenu from '../../components/DrawerMenu/index';

const MainLayout = ({ children }) => {
    const [open, setOpen] = useState(true);

    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                width: "100%"
            }}
        >
            <DrawerMenu
                open={open}
                setOpen={setOpen}
            />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: {
                        xs: "100%",
                        md: "auto"
                    },
                    p: {
                        xs: 1.5,
                        sm: 2,
                        md: 3
                    },
                    overflowX: "hidden"
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default MainLayout;