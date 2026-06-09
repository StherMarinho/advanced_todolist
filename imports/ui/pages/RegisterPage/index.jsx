import React, { useState } from "react";

import { Accounts } from "meteor/accounts-base";

import { Link, useNavigate } from "react-router-dom";
import { MenuItem, Typography, Box, Link as MuiLink } from "@mui/material";
import { DateField } from "@mui/x-date-pickers/DateField";

import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import CustomTextField from "../../components/CustomTextField/index";
import CustomButton from "../../components/CustomButton/index";
import FormCard from "../../components/FormCard";
import { esES } from "@mui/x-date-pickers/locales";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [birthDate, setBirthDate] = useState(null);
    const [genero, setGenero] = useState("");
    const [empresa, setEmpresa] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    function handleRegister(evento) {
    evento.preventDefault();

    const newErrors = {};

    if (!name) newErrors.name = "Nome obrigatório";
    if (!email) newErrors.email = "Email obrigatório";
    if (!password) newErrors.password = "Senha obrigatória";
    if (!confirmPassword) newErrors.confirmPassword = "Confirme a senha";

    if (password && password.length < 6) {
        newErrors.password = "Mínimo 6 caracteres";
    }

    if (password !== confirmPassword) {
        newErrors.confirmPassword = "As senhas não coincidem";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    Accounts.createUser(
        {
            email,
            password,
            profile: {
                name,
                birthDate: birthDate ? birthDate.format("YYYY-MM-DD") : "",
                genero,
                empresa,
                photo: ""
            },
        },
        (erro) => {
            setLoading(false);

            if (erro) {
                setErrors({ general: erro.reason || "Erro ao criar conta" });
                return;
            }

            navigate("/login");
        }
    );
}

    return (
        <AuthLayout>
            <FormCard>
                <Box
                    mb={4}
                    sx={{
                        textAlign: "center"
                    }}
                >

                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        gutterBottom
                    >
                        Cadastro
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Cadastre-se para acessar o sistema
                    </Typography>

                </Box>

                <Box
                    component="form"
                    onSubmit={handleRegister}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2
                    }}
                >

                    <CustomTextField
                        label="Nome"
                        required
                        value={name}
                        error={errors.name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <CustomTextField
                        label="Email"
                        required
                        type="email"
                        value={email}
                        error={errors.email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <CustomTextField
                        label="Senha"
                        required
                        type="password"
                        value={password}
                        error={errors.password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <CustomTextField
                        label="Confirmar Senha"
                        required
                        type="password"
                        value={confirmPassword}
                        error={errors.confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <DateField
                        label="Data de Nascimento"
                        value={birthDate}
                        onChange={(newValue) => setBirthDate(newValue)}
                        format="DD/MM/YYYY"
                        fullWidth
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
                    
                    <Box
                        sx={{
                            mt: 2,
                            textAlign: "center"
                        }}
                    >
                        {errors.general && (
                            <Typography
                                color="error"
                                variant="body2"
                            >
                                {errors.general}
                            </Typography>
                        )}
                        <CustomButton
                            text="Cadastrar"
                            type="submit"
                            disabled={loading}
                        />
                    
                    </Box>
                </Box>

                <Box
                    sx={{
                        mt: 4,
                        textAlign: "center"
                    }}
                >
                    <Typography
                        color="text.secondary"
                        variant="body2"
                    >
                        Já possui conta?


                        <MuiLink
                            component={Link}
                            to="/login"
                            sx={{
                                ml: 1,
                                fontWeight: "bold",
                                textDecoration: "none",
                                cursor: "pointer"
                            }}
                        >
                            Faça login
                        </MuiLink>

                    </Typography>
                </Box>


            </FormCard>

        </AuthLayout>
    );
};

export default RegisterPage;