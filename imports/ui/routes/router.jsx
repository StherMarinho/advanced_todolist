import React from "react";
import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../pages/LoginPage/index";
import HomePage from "../pages/HomePage/index";
import DashboardPage from "../pages/DashboardPage/index";
import TasksPage from "../pages/TasksPage/index";
import ProfilePage from "../pages/ProfilePage/index";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
    },
    {
        path: "/home",
        element:(
            <ProtectedRoute>
                <HomePage />
            </ProtectedRoute>
        ), 
        
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <DashboardPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/tasks",
        element: (
            <ProtectedRoute>
                <TasksPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/profile",
        element: (
            <ProtectedRoute>
                <ProfilePage />
            </ProtectedRoute>
        ),
    },
]);