import { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { Accounts } from "meteor/accounts-base";

import {Box, Paper, Typography, MenuItem, Avatar, Divider } from "@mui/material";

import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs from "dayjs";

import CustomTextField from "../../components/CustomTextField";
import CustomButton from "../../components/CustomButton";

const ProfilePage = () => {
    
    const user = useTracker(() => {//useTracke: monitora reativamente o estado do Meteor.user(). Se o usuário fizer login, logout ou se os dados dele mudarem no servidor, o componente React será atualizado automaticamente.
        Meteor.subscribe("usersData");
        
        return Meteor.user();
    }); 

    const [name, setName] = useState("");
    const [birthDate, setBirthDate] = useState(null);
    const [genero, setGenero] = useState("");
    const [empresa, setEmpresa] = useState("");
    const [photo, setPhoto] = useState("");
    const [email, setEmail] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {

        if (!user) {
            return;
        }

        setName((valorAtual) =>
            valorAtual || user.profile?.name || ""
        );

        setBirthDate((valorAtual) =>
            valorAtual ||
            (
                user.profile?.birthDate
                    ? dayjs(user.profile.birthDate)
                    : null
            )
        );

        setGenero((valorAtual) =>
            valorAtual || user.profile?.genero || ""
        );

        setEmpresa((valorAtual) =>
            valorAtual || user.profile?.empresa || ""
        );

        setPhoto((valorAtual) =>
            valorAtual || user.profile?.photo || ""
        );

        setEmail((valorAtual) =>
            valorAtual || user.emails?.[0]?.address || ""
        );

    }, [user]);

    function handlePhotoUpload(evento) {

    const file = evento.target.files[0];

    if (!file) {
        return;
    }

    if (file.size > 1024 * 1024) {
        alert(
            "A imagem deve possuir no máximo 1 MB."
        );
        return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
        setPhoto(reader.result);
    };

    reader.readAsDataURL(file);
}

    function alterarSenha(callbackSucesso) {

        if (!newPassword) {
            callbackSucesso();
            return;
        }

        if (!currentPassword) {
            alert("Informe a senha atual.");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("As senhas não coincidem.");
            return;
        }

        if (newPassword === currentPassword) {
            alert("A nova senha deve ser diferente da atual.");
            return;
        }

        if (newPassword.length < 6) {
            alert("A nova senha deve possuir pelo menos 6 caracteres.");
            return;
        }

        Accounts.changePassword(
            currentPassword,
            newPassword,
            (erroSenha) => {

                if (erroSenha) {
                    alert(
                        erroSenha.reason ||
                        erroSenha.message ||
                        "Erro ao alterar senha."
                    );
                    return;
                }

                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");

                callbackSucesso();
            }
        );
    }

    function handleSubmit(evento) {
    evento.preventDefault();

    if (!email || !email.includes("@")) {
        alert("Informe um email válido.");
        return;
    }

    Meteor.call(
        "users.updateProfile",
        {
            name,
            birthDate:
                birthDate && dayjs(birthDate).isValid()
                    ? birthDate.toDate()
                    : null,
            genero,
            empresa,
            photo
        },
        (erroPerfil) => {

            if (erroPerfil) {
                console.error("Erro perfil:", erroPerfil);

                alert(
                    erroPerfil.reason ||
                    erroPerfil.message ||
                    "Erro ao atualizar perfil."
                );

                return;
            }

            const emailAtual =
                user?.emails?.[0]?.address?.trim().toLowerCase() || "";

            const novoEmail =
                email.trim().toLowerCase();

            const finalizar = () => {
                alert("Perfil atualizado com sucesso!");
            };

            if (novoEmail !== emailAtual) {
                
                Meteor.call("users.updateEmail",{ email: novoEmail},
                    (erroEmail) => {
                        
                        if (erroEmail) {
                            console.error(
                                "Erro email:",
                                erroEmail
                            );

                            alert(
                                erroEmail.reason ||
                                erroEmail.message ||
                                "Erro ao atualizar e-mail."
                            );

                            return;
                        }

                        alterarSenha(finalizar);
                        console.log('Email atual:', emailAtual);
                    }
                );

                return;
            }

            alterarSenha(finalizar);
        }
    );
}

    return (
        <Box
            sx={{
                minHeight: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 3
            }}
        >
            <Paper
                elevation={10}
                sx={{
                    width: "100%",
                    maxWidth: 600,
                    p: {
                        xs: 2,
                        sm: 3,
                        md: 4
                    },
                    borderRadius: 4,
                    backgroundColor: "#f8fafc"
                }}
            >
                <Typography
                    sx={{
                        fontSize: {
                            xs: "28px",
                            md: "40px"
                        },
                        textAlign: "center",
                        mb: 4
                    }}
                >
                    Meu Perfil
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            mb: 3
                        }}
                    >
                        <Avatar
                            src={photo}
                            sx={{
                                width: {
                                    xs: 90,
                                    md: 120
                                },
                                height: {
                                    xs: 90,
                                    md: 120
                                },
                                mb: 3,
                                bgcolor: "#334155"
                            }}
                        />

                        <label htmlFor="upload-photo">
                            <input
                                id="upload-photo"
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handlePhotoUpload}
                            />

                            <CustomButton
                                text="Selecionar Foto"
                                component="span"
                            />
                        </label>
                    </Box>

                    <CustomTextField
                        label="Nome"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />

                    <DateField
                        label="Data de Nascimento"
                        value={birthDate}
                        onChange={(newValue) =>
                            setBirthDate(newValue)
                        }
                        format="DD/MM/YYYY"
                        fullWidth
                    />

                    <CustomTextField
                        label="Gênero"
                        select
                        value={genero}
                        onChange={(e) =>
                            setGenero(e.target.value)
                        }
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
                        onChange={(e) =>
                            setEmpresa(e.target.value)
                        }
                    />

                    <Divider sx={{ my: 2 }} />

                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: "bold"
                        }}
                    >
                        Login
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Caso queira, altere os dados do login para acessar o sistema
                    </Typography>

                    <CustomTextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <CustomTextField
                        label="Senha Atual"
                        type="password"
                        value={currentPassword}
                        onChange={(e) =>
                            setCurrentPassword(e.target.value)
                        }
                    />

                    <CustomTextField
                        label="Nova Senha"
                        type="password"
                        value={newPassword}
                        onChange={(e) =>
                            setNewPassword(e.target.value)
                        }
                    />

                    <CustomTextField
                        label="Confirmar Nova Senha"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                    />

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: 2
                        }}
                    >
                        <CustomButton
                            text="Salvar Alterações"
                            type="submit"
                            sx={{
                                width: {
                                    xs: "100%",
                                    md: 200
                                },
                                height: 50
                            }}
                        />
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default ProfilePage;