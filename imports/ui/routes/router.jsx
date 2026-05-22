import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Meteor } from "meteor/meteor";

import LoginPage from "../pages/LoginPage/index";
import RegisterPage from "../pages/RegisterPage/index";
import HomePage from "../pages/HomePage/index";
import DashboardPage from "../pages/DashboardPage/index";
import TasksPage from "../pages/TasksPage/index";
import ProfilePage from "../pages/ProfilePage/index";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

function ProtectedRoute({ children }) {
    if (!Meteor.userId()) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/login"/>
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/home",
        element:(
            <ProtectedRoute>
                <MainLayout>
                    <HomePage />
                </MainLayout>
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

export default router;