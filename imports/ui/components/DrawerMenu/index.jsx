//menu lateral
import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

const DrawerMenu = () => {
    return (
        <aside className="drawer-menu">
            <h2>Menu</h2>

            <nav>
                <Link to="/home">Home</Link>
                <Link to="/tasks">Tarefas</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/profile">Perfil</Link>
            </nav>
        </aside>
    );
};

export default DrawerMenu;