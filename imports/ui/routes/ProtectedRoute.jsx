//responsabilidade: proteger rotas que exigem autenticação, redirecionando usuários não autenticados para a página de login.
import React from "react";
import { Navigate } from "react-router-dom"; //biblioteca padrão para criar rotas e gerenciar a navegação em aplicações React.
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