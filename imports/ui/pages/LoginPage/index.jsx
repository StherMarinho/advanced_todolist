//Responsabilidade: Página de login, cadastro, autenticação e recuperação de senha.
import {useState} from "react";
import {Meteor} from "meteor/meteor";
import { Link, useNavigate } from "react-router-dom";
import CustomTextField from "../../components/CustomTextField/index";
import CustomButton from "../../components/CustomButtom/index";

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
                navigate("/");
            }
        );
    };

    return (
        <div className="login-page">
            <h1>Login Page</h1>
        </div>
    );
};

export default LoginPage;