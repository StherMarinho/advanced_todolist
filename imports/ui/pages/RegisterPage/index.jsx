// cadastro
import React, { useState } from "react";

import { Accounts } from "meteor/accounts-base";

import { Link, useNavigate } from "react-router-dom";
import { MenuItem, Typography, Box } from "@mui/material";

import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import CustomTextField from "../../components/CustomTextField/index";
import CustomButton from "../../components/CustomButton/index";
import FormCard from "../../components/FormCard";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [genero, setGenero] = useState("");
    const [empresa, setEmpresa] = useState("");
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
                    birthDate,
                    genero,
                    empresa,
                    photo: ""
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

            <FormCard
                sx={{
                    maxWidth: 500
                }}
            >

                <div className="login-header">
                    <h1>Cadastro</h1>

                    <p>
                        Cadastre-se para acessar o sistema
                    </p>
                </div>

                <form
                    className="login-form"
                    onSubmit={handleRegister}
                >

                    <CustomTextField
                        label="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <CustomTextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <CustomTextField
                        label="Senha"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <CustomTextField
                        label="Confirmar Senha"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <CustomTextField
                        label="Data de Nascimento"
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />

                    <CustomTextField
                        label="Gênero"
                        select
                        value={genero}
                        onChange={(e) => setGenero(e.target.value)}
                    >

                        <MenuItem value="Masculino">
                            Masculino
                        </MenuItem>

                        <MenuItem value="Feminino">
                            Feminino
                        </MenuItem>

                        <MenuItem value="Outro">
                            Outro
                        </MenuItem>

                    </CustomTextField>

                    <CustomTextField
                        label="Empresa"
                        value={empresa}
                        onChange={(e) => setEmpresa(e.target.value)}
                    />

                    {
                        error &&
                        <p className="login-error">
                            {error}
                        </p>
                    }

                    <CustomButton
                        text="Cadastrar"
                        type="submit"
                        disabled={loading}
                    />

                </form>

                <p className="login-register-text">
                    Já possui conta?

                    <Link
                        to="/login"
                        className="login-register-link"
                    >
                        Faça login
                    </Link>

                </p>

            </FormCard>

        </AuthLayout>
    );
};

export default RegisterPage;