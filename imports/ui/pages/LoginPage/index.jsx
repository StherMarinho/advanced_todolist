//Responsabilidade: Página de login, cadastro, autenticação e recuperação de senha.
import {useState} from "react";
import {Meteor} from "meteor/meteor";
import { Link, useNavigate } from "react-router-dom";
import CustomTextField from "../../components/CustomTextField/index";
import CustomButton from "../../components/CustomButton/index";
import FormCard from "../../components/FormCard";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";

import "./Login.css";

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
                <div className="login-header">
                    <h1>Login</h1>
                    <p>
                        Faça login para acessar o sistema
                    </p>
                </div>
                <form
                    className="login-form"
                    onSubmit={handleLogin}
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
                    {
                        error &&
                        <p className="login-error">
                            {error}
                        </p>
                    }
                    <CustomButton
                        text="Entrar"
                        type="submit"
                    />
                </form>
                <p className="login-register-text">
                    Não possui conta?
                    <Link
                        to="/register"
                        className="login-register-link"
                    >
                        Criar conta
                    </Link>
                </p>
            </FormCard>
        </AuthLayout>
    );
};

export default LoginPage;