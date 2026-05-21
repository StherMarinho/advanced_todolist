// cadastro
import React, { useState } from "react";

import { Accounts } from "meteor/accounts-base";

import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../../layouts/AuthLayout/AuthLayout";

import CustomTextField from "../../components/CustomTextField/index";

import CustomButton from "../../components/CustomButtom/index";

import "./RegisterPage.css";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleRegister(evento) {
        evento.preventDefault();
        setError("");
        if (password !== confirmPassword) {
            setError("As senhas não coincidem. Tente novamente.");
            return;
        }
        Accounts.createUser(
            {
                email,
                password,
                profile: {
                    name,
                },
            },
            (erro) => {
                if (erro) {
                    setError("Ocorreu um erro ao criar a conta. Tente novamente.");
                    return;
                }
                navigate("/login");
            }
        );
    }

    return (
        <AuthLayout>
            <div className="register-container">
                <div className="register-header">
                    <h1>Cadastro</h1>
                    <p>
                        Cadastre-se para acessar o sistema
                    </p>
                </div>

                <form
                    className="register-form"
                    onSubmit={handleRegister}
                >
                    <CustomTextField
                        label="Nome"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Digite seu nome"
                    />
                    <CustomTextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu email"
                    />
                    <CustomTextField
                        label="Senha"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Digite sua senha"
                    />
                    <CustomTextField
                        label="Confirmar Senha"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirme sua senha"
                    />
                    {
                        error &&
                        <p className="register-error">
                            {error}
                        </p>
                    }
                    <CustomButton
                        text="Cadastrar"
                        type="submit"
                        disabled={loading}
                    />
                </form>

                <p className="register-login-text">
                    Já tem uma conta?
                    <Link
                        to="/login"
                        className="register-login-link"
                    >
                        Faça login
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
};

export default RegisterPage;