//função: customizar a criação de usuários, adicionando campos personalizados (ações automáticas ao criar usuário).
import { Accounts } from "meteor/accounts-base";

Accounts.onCreateUser((options, user) => {
    // Lógica para executar quando um novo usuário é criado
    user.createdAt = new Date(); // Adiciona a data de criação do usuário

    user.tasksStats = { // Adiciona um campo para armazenar estatísticas de tarefas do usuário (não está sendo utilizado no momento,por exemplo para os dashs, mas pode ser útil para futuras funcionalidades)
        total: 0,
        completed: 0,
    };

    if (options.profile) {
        user.profile = options.profile; // Preserva o perfil do usuário, se fornecido
    }   

    return user;
});