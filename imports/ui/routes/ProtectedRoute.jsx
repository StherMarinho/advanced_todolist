import React from "react";
import { Navigate } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

const ProtectedRoute = ({ children }) => {

    const userId = useTracker(() => Meteor.userId());

    if (userId === undefined) {
        return <div>Carregando...</div>;
    }

    if (!userId) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;