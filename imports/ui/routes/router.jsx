import React from "react";

import { createBrowserRouter, Navigate } from "react-router-dom";

import LoginPage from "../pages/LoginPage/index";
import RegisterPage from "../pages/RegisterPage/index";
import HomePage from "../pages/HomePage/index";
import DashboardPage from "../pages/DashboardPage/index";
import TasksPage from "../pages/TasksPage/index";
import TaskDetailsPage from "../pages/TaskDetailsPage/index";
import ProfilePage from "../pages/ProfilePage/index";

import ProtectedRoute from "./ProtectedRoute";

import MainLayout from "../layouts/MainLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/login" replace />,
    },

    {
        path: "/login",
        element: <LoginPage />,
    },

    {
        path: "/register",
        element: <RegisterPage />,
    },

    {
        path: "/home",
        element: (
            <ProtectedRoute>
                <MainLayout>
                    <HomePage />
                </MainLayout>
            </ProtectedRoute>
        ),
    },

    {
        path: "/tasks",
        element: (
            <ProtectedRoute>
                <MainLayout>
                    <TasksPage />
                </MainLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: "/tasks/new",
        element: (
            <ProtectedRoute>
                <MainLayout>
                    <TaskDetailsPage />
                </MainLayout>
            </ProtectedRoute>
        ),
    },

    {
        path: "/tasks/:id",
        element: (
            <ProtectedRoute>
                <MainLayout>
                    <TaskDetailsPage />
                </MainLayout>
            </ProtectedRoute>
        ),
    },

    {
        path: "/profile",
        element: (
            <ProtectedRoute>
                <MainLayout>
                    <ProfilePage />
                </MainLayout>
            </ProtectedRoute>
        ),
    },
]);

export default router;