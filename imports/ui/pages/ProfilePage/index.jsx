//Responsabilidade: Mostrar informações do perfil do usuário para editar.
import { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import { Box, Paper, Typography, MenuItem, Avatar } from "@mui/material";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs from "dayjs";

import CustomTextField from "../../components/CustomTextField/index";
import CustomButton from "../../components/CustomButton/index";

const ProfilePage = () => {
    Meteor.subscribe("usersData");

    const user = useTracker(() => Meteor.user());

    const [name, setName] = useState(user?.profile?.name || "");
    const [birthDate, setBirthDate] = useState(user?.profile?.birthDate ? dayjs(user.profile.birthDate) : null);
    const [genero, setGenero] = useState(user?.profile?.genero || "");
    const [empresa, setEmpresa] = useState(user?.profile?.empresa || "");
    const [photo, setPhoto] = useState(user?.profile?.photo || "");

    useEffect(() =>{
        if(user && !name){
            setName(user.profile?.name || "");
            setBirthDate(user.profile?.birthDate ? dayjs(user.profile.birthDate) : null);
            setGenero(user.profile?.genero || "");
            setEmpresa(user.profile?.empresa || "");
            setPhoto(user.profile?.photo || "");
        }
    }, [user]);

    function handlePhotoUpload(evento) {
        const file = evento.target.files[0];
        if (!file){
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setPhoto(reader.result);
        };
        reader.readAsDataURL(file);
    }

    function handleSubmit(evento) {
        evento.preventDefault();
        Meteor.call("users.updateProfile", { 
            name, 
            birthDate: birthDate ? birthDate.toDate() : null, 
            genero, 
            empresa, 
            photo 
        }, 
            (erro) => {
                if (erro) {
                console.log(erro);

                alert(
                    "Ocorreu um erro ao atualizar o perfil."
                );

                return;
            }

            alert("Perfil atualizado com sucesso!");
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
            //background: "linear-gradient(135deg, #0f172a, #1e293b)",
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
                backgroundColor: "#f8fafc",
            }}
        >
            <Typography      
                sx={{
                    fontSize: {
                        xs: "28px",
                        md: "40px"
                    },
                    textAlign: "center",
                    mb: 4,
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
                    onChange={(e) => setName(e.target.value)}
                />

                <CustomTextField
                    label="Email"
                    value={user?.emails?.[0]?.address || ""}
                    disabled
                />

                <DateField
                        label="Data de Nascimento"
                        value={birthDate}
                        onChange={(newValue) => setBirthDate(newValue)}
                        format="DD/MM/YYYY"
                        fullWidth
                        /*slotProps={{ inputLabel: { shrink: true } }}
                        InputLabelProps={{
                            shrink: true
                        }}*/
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
                    >
                    </CustomButton>
                </Box>
            </Box>
        </Paper>
    </Box>
);
}

export default ProfilePage;