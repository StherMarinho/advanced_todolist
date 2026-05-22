import { Draw } from '@mui/icons-material';
import React, { useState } from "react";
import DrawerMenu from '../../components/DrawerMenu/index';
import "./MainLayout.css";

const MainLayout = ({ children }) => {

    const [open, setOpen] = useState(true);

    return (
        <div
            style={{
                display: "flex"
            }}
        >
            <DrawerMenu
                open={open}
                setOpen={setOpen}
            />

            <main
                style={{
                    flex: 1,
                    padding: "24px"
                }}
            >
                {children}
            </main>
        </div>
    );
};

export default MainLayout;