//responsabilidade: proteger rotas que exigem autenticação, redirecionando usuários não autenticados para a página de login.
import React from "react";
import { Navigate } from "react-router-dom"; //biblioteca padrão para criar rotas e gerenciar a navegação em aplicações React.
import { Meteor } from "meteor/meteor";

const ProtectedRoute = ({ children }) => {
    const user = Meteor.user(); 

    if (!user) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;