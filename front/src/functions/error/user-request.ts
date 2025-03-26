/* eslint-disable prettier/prettier */

export function UserRequestError(message: string): {
    ok: false
    error: string
    data: null
} {
    if (message.includes('Unauthenticated')) {
        return { error: 'Não autorizado', ok: false, data: null }
    }
    if (message.includes('O nome é obrigatório.')) {
        return { error: 'O nome é obrigatório.', ok: false, data: null }
    }
    if (message.includes('O nome deve ter pelo menos 3 caracteres.')) {
        return {
            error: 'O nome deve ter pelo menos 3 caracteres.',
            ok: false,
            data: null,
        }
    }
    if (message.includes('O nome não pode ter mais de 120 caracteres.')) {
        return {
            error: 'O nome não pode ter mais de 120 caracteres.',
            ok: false,
            data: null,
        }
    }
    if (message.includes('O nome contém caracteres inválidos.')) {
        return {
            error: 'O nome contém caracteres inválidos.',
            ok: false,
            data: null,
        }
    }
    if (message.includes('O contato é obrigatório.')) {
        return { error: 'O contato é obrigatório.', ok: false, data: null }
    }
    if (message.includes('Esse número de telefone já está cadastrado.')) {
        return { error: 'Esse número de telefone já está cadastrado.', ok: false, data: null }
    }
    if (message.includes('O nome deve ter pelo menos 8 caracteres.')) {
        return {
            error: 'O nome deve ter pelo menos 8 caracteres.',
            ok: false,
            data: null,
        }
    }
    if (message.includes('O nome não pode ter mais de 11 caracteres.')) {
        return {
            error: 'O nome não pode ter mais de 11 caracteres.',
            ok: false,
            data: null,
        }
    }

    if (message.includes('É necessário aceitar os termos.')) {
        return { error: 'É necessário aceitar os termos.', ok: false, data: null }
    }
    if (message.includes('O campo de aceite contém caracteres inválidos.')) {
        return {
            error: 'O campo de aceite contém caracteres inválidos.',
            ok: false,
            data: null,
        }
    }
    if (message.includes('O e-mail é obrigatório.')) {
        return { error: 'O e-mail é obrigatório.', ok: false, data: null }
    }
    if (message.includes('O e-mail informado não é válido.')) {
        return { error: 'O e-mail informado não é válido.', ok: false, data: null }
    }
    if (message.includes('O e-mail não pode ter mais de 255 caracteres.')) {
        return {
            error: 'O e-mail não pode ter mais de 255 caracteres.',
            ok: false,
            data: null,
        }
    }
    if (message.includes('O e-mail deve ter pelo menos 2 caracteres.')) {
        return {
            error: 'O e-mail deve ter pelo menos 2 caracteres.',
            ok: false,
            data: null,
        }
    }
    if (message.includes('Este e-mail já está cadastrado.')) {
        return { error: 'Este e-mail já está cadastrado.', ok: false, data: null }
    }
    if (message.includes('E-mail não verificado')) {
        return { error: 'E-mail não verificado', ok: false, data: null }
    }

    if (message.includes('A senha é obrigatória.')) {
        return { error: 'A senha é obrigatória.', ok: false, data: null }
    }
    if (message.includes('A confirmação da senha não corresponde.')) {
        return {
            error: 'A confirmação da senha não corresponde.',
            ok: false,
            data: null,
        }
    }
    if (message.includes('A senha deve ter pelo menos 8 caracteres.')) {
        return {
            error: 'A senha deve ter pelo menos 8 caracteres.',
            ok: false,
            data: null,
        }
    }
    if (
        message.includes(
            'A senha deve conter pelo menos uma letra maiúscula e uma minúscula.'
        )) {
        return {
            error:
                'A senha deve conter pelo menos uma letra maiúscula e uma minúscula.',
            ok: false,
            data: null,
        }
    }
    if (message.includes('A senha deve conter pelo menos uma letra.')) {
        return {
            error: 'A senha deve conter pelo menos uma letra.',
            ok: false,
            data: null,
        }
    }
    if (message.includes('A senha deve conter pelo menos um número.')) {
        return {
            error: 'A senha deve conter pelo menos um número.',
            ok: false,
            data: null,
        }
    }
    if (message.includes('A senha deve conter pelo menos um símbolo.')) {
        return {
            error: 'A senha deve conter pelo menos um símbolo.',
            ok: false,
            data: null,
        }
    }
    if (
        message.includes(
            'A senha escolhida já apareceu em vazamentos de dados. Escolha outra senha.'
        )) {
        return {
            error:
                'A senha escolhida já apareceu em vazamentos de dados. Escolha outra senha.',
            ok: false,
            data: null,
        }
    }

    if (message.includes('A confirmação da senha é obrigatória.')) {
        return {
            error: 'A confirmação da senha é obrigatória.',
            ok: false,
            data: null,
        }
    }
    if (message.includes('A confirmação da senha deve ter pelo menos 8 caracteres.')) {
        return {
            error: 'A confirmação da senha deve ter pelo menos 8 caracteres.',
            ok: false,
            data: null,
        }
    }
    if (message.includes('Failed to send email')) {
        return {
            error: 'E-mail não cadastrado.',
            ok: false,
            data: null,
        }
    }
    return { error: 'Ocorreu um erro inesperado', ok: false, data: null }
}


export function UserRequestWithReturnError(message: string) {
    if (message.includes('Unauthenticated')) {
        return 'Não autorizado'
    }
    if (message.includes('O nome é obrigatório.')) {
        return 'O nome é obrigatório.'
    }
    if (message.includes('O nome deve ter pelo menos 3 caracteres.')) {
        return 'O nome deve ter pelo menos 3 caracteres.'
    }
    if (message.includes('O nome não pode ter mais de 120 caracteres.')) {
        return 'O nome não pode ter mais de 120 caracteres.'
    }
    if (message.includes('O nome contém caracteres inválidos.')) {
        return 'O nome contém caracteres inválidos.'
    }
    if (message.includes('O contato é obrigatório.')) {
        return 'O contato é obrigatório.'
    }
    if (message.includes('Esse número de telefone já está cadastrado.')) {
        return 'Esse número de telefone já está cadastrado.'
    }
    if (message.includes('O nome deve ter pelo menos 8 caracteres.')) {
        return 'O nome deve ter pelo menos 8 caracteres.'
    }
    if (message.includes('O nome não pode ter mais de 11 caracteres.')) {
        return 'O nome não pode ter mais de 11 caracteres.'
    }
    if (message.includes('É necessário aceitar os termos.')) {
        return 'É necessário aceitar os termos.'
    }
    if (message.includes('O campo de aceite contém caracteres inválidos.')) {
        return 'O campo de aceite contém caracteres inválidos.'
    }
    if (message.includes('O e-mail é obrigatório.')) {
        return 'O e-mail é obrigatório.'
    }
    if (message.includes('O e-mail informado não é válido.')) {
        return 'O e-mail informado não é válido.'
    }
    if (message.includes('O e-mail não pode ter mais de 255 caracteres.')) {
        return 'O e-mail não pode ter mais de 255 caracteres.'
    }
    if (message.includes('O e-mail deve ter pelo menos 2 caracteres.')) {
        return 'O e-mail deve ter pelo menos 2 caracteres.'
    }
    if (message.includes('Este e-mail já está cadastrado.')) {
        return 'Este e-mail já está cadastrado.'
    }
    if (message.includes('E-mail não verificado')) {
        return 'E-mail não verificado'
    }
    if (message.includes('A senha é obrigatória.')) {
        return 'A senha é obrigatória.'
    }
    if (message.includes('A confirmação da senha não corresponde.')) {
        return 'A confirmação da senha não corresponde.'
    }
    if (message.includes('A senha deve ter pelo menos 8 caracteres.')) {
        return 'A senha deve ter pelo menos 8 caracteres.'
    }
    if (
        message.includes(
            'A senha deve conter pelo menos uma letra maiúscula e uma minúscula.'
        ) || message.includes('The password field must contain at least one uppercase and one lowercase letter.')) {
        return 'A senha deve conter pelo menos uma letra maiúscula e uma minúscula.'
    }
    if (message.includes('A senha deve conter pelo menos uma letra.')) {
        return 'A senha deve conter pelo menos uma letra.'
    }
    if (message.includes('A senha deve conter pelo menos um número.')) {
        return 'A senha deve conter pelo menos um número.'
    }
    if (message.includes('A senha deve conter pelo menos um símbolo.')) {
        return 'A senha deve conter pelo menos um símbolo.'
    }
    if (
        message.includes(
            'A senha escolhida já apareceu em vazamentos de dados. Escolha outra senha.'
        )) {
        return 'A senha escolhida já apareceu em vazamentos de dados. Escolha outra senha.'
    }
    if (message.includes('A confirmação da senha é obrigatória.')) {
        return 'A confirmação da senha é obrigatória.'
    }
    if (message.includes('A confirmação da senha deve ter pelo menos 8 caracteres.')) {
        return 'A confirmação da senha deve ter pelo menos 8 caracteres.'
    }
    if (message.includes('Failed to send email')) {
        return 'E-mail não cadastrado.'
    }
    return 'Ocorreu um erro inesperado'
}