//Responsabilidade: Página de login, cadastro, autenticação e recuperação de senha.
import {useState} from "react";
import {Meteor} from "meteor/meteor";

import { Link, useNavigate } from "react-router-dom";
import { MenuItem, Typography, Box, Link as MuiLink } from "@mui/material";

import CustomTextField from "../../components/CustomTextField/index";
import CustomButton from "../../components/CustomButton/index";
import FormCard from "../../components/FormCard";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";

const LoginPage = () => {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleLogin = (evento) => {
        evento.preventDefault();
        setError("");
        setLoading(true);

        Meteor.loginWithPassword(
            email, 
            password, 
            (erro) => {
                setLoading(false);
                if (erro) {
                    setError("E-mail ou senha inválidos. Tente novamente.");
                    return;
                }
                navigate("/home");
            }
        );
    };

    return (
        <AuthLayout>
            <FormCard>
                <Box
                    textAlign="center"
                    sx={{
                        mb: 3
                    }}
                >
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        gutterBottom
                    >
                        Login
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Faça login para acessar o sistema
                    </Typography>
                </Box>

                <Box
                    component="form"
                    onSubmit={handleLogin}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2
                    }}
                >
                    <CustomTextField
                        label="E-mail"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu e-mail"
                    />

                    <CustomTextField
                        label="Senha"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Digite sua senha"
                    />
                    {error && (
                        <Typography
                            color="error"
                            variant="body2"
                        >
                            {error}
                        </Typography>
                    )}

                    <CustomButton
                        text={loading ? "Entrando..." : "Entrar"}
                        type="submit"
                        disabled={loading}
                    />
                </Box>

                <Box
                    sx={{
                        mt: 3,
                        textAlign: "center"
                    }}
                >
                    <Typography
                        textAlign="center"
                        mt={3}
                        color="text.secondary"
                        variant="body2"
                    >
                        Não possui conta?

                        <MuiLink
                            component={Link}
                            to="/register"
                            sx={{
                                ml: 1,
                                fontWeight: "bold",
                                textDecoration: "none",
                                cursor: "pointer"
                            }}
                        >
                            Criar conta
                        </MuiLink>
                    </Typography>
                </Box>

            </FormCard>
        </AuthLayout>
    );
};

export default LoginPage;