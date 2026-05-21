import { Draw } from '@mui/icons-material';
import React from 'react';

const MainLayout = ({ children }) => {
    return (
        <div className="main-layout">
            <DrawerMenu />

            <main className="main-content">  
                {children}
            </main>
        </div>
    );
}

export default MainLayout;