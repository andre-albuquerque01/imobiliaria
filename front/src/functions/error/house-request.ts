/* eslint-disable prettier/prettier */
export function HouseRequestError(message: string): {
    ok: false
    error: string
    data: null
} {
    if (message === 'O titulo é obrigatório.') {
        return { error: 'O titulo é obrigatório.', ok: false, data: null }
    }
    if (message === 'O titulo não pode ter mais de 255 caracteres.') {
        return {
            error: 'O titulo não pode ter mais de 255 caracteres.',
            ok: false,
            data: null,
        }
    }
    if (message === 'O titulo deve ter pelo menos 4 caracteres.') {
        return {
            error: 'O titulo deve ter pelo menos 4 caracteres.',
            ok: false,
            data: null,
        }
    }
    if (message === 'O descrição é obrigatório.') {
        return { error: 'O descrição é obrigatório.', ok: false, data: null }
    }
    if (message === 'O descrição não pode ter mais de 255 caracteres.') {
        return {
            error: 'O descrição não pode ter mais de 255 caracteres.',
            ok: false,
            data: null,
        }
    }
    if (message === 'O descrição deve ter pelo menos 4 caracteres.') {
        return {
            error: 'O descrição deve ter pelo menos 4 caracteres.',
            ok: false,
            data: null,
        }
    }
    if (message === 'O valor é obrigatório.') {
        return { error: 'O valor é obrigatório.', ok: false, data: null }
    }
    if (message === 'O valor não pode ter mais de 255 caracteres.') {
        return {
            error: 'O valor não pode ter mais de 255 caracteres.',
            ok: false,
            data: null,
        }
    }
    if (message === 'O valor deve ter pelo menos 2 caracteres.') {
        return {
            error: 'O valor deve ter pelo menos 2 caracteres.',
            ok: false,
            data: null,
        }
    }
    if (message === 'O quarto não pode ter mais de 20 caracteres.') {
        return {
            error: 'O quarto não pode ter mais de 20 caracteres.',
            ok: false,
            data: null,
        }
    }
    if (message === 'O quarto deve ter pelo menos 1 caracteres.') {
        return {
            error: 'O quarto deve ter pelo menos 1 caracteres.',
            ok: false,
            data: null,
        }
    }
    if (message === 'O endereço não pode ter mais de 20 caracteres.') {
        return {
            error: 'O endereço não pode ter mais de 20 caracteres.',
            ok: false,
            data: null,
        }
    }
    if (message === 'O endereço deve ter pelo menos 1 caracteres.') {
        return {
            error: 'O endereço deve ter pelo menos 1 caracteres.',
            ok: false,
            data: null,
        }
    }
    if (message === 'O endereço não pode ter mais de 20 caracteres.') {
        return {
            error: 'O endereço não pode ter mais de 20 caracteres.',
            ok: false,
            data: null,
        }
    }
    if (message === 'O endereço deve ter pelo menos 1 caracteres.') {
        return {
            error: 'O endereço deve ter pelo menos 1 caracteres.',
            ok: false,
            data: null,
        }
    }
    return { error: 'Ocorreu um erro inesperado', ok: false, data: null }
}


export function HouseRequestWithReturnError(message: string) {
    if (message === 'O titulo é obrigatório.') {
        return 'O titulo é obrigatório.'
    }
    if (message === 'O titulo não pode ter mais de 255 caracteres.') {
        return 'O titulo não pode ter mais de 255 caracteres.'           
    }
    if (message === 'O titulo deve ter pelo menos 4 caracteres.') {
        return 'O titulo deve ter pelo menos 4 caracteres.'
    }
    if (message === 'O descrição é obrigatório.') {
        return 'O descrição é obrigatório.'
    }
    if (message === 'O descrição não pode ter mais de 255 caracteres.') {
        return 'O descrição não pode ter mais de 255 caracteres.'
    }
    if (message === 'O descrição deve ter pelo menos 4 caracteres.') {
        return 'O descrição deve ter pelo menos 4 caracteres.'
    }
    if (message === 'O valor é obrigatório.') {
        return 'O valor é obrigatório.'
    }
    if (message === 'O valor não pode ter mais de 255 caracteres.') {
        return 'O valor não pode ter mais de 255 caracteres.'         
    }
    if (message === 'O valor deve ter pelo menos 2 caracteres.') {
        return 'O valor deve ter pelo menos 2 caracteres.'
    }
    if (message === 'O quarto não pode ter mais de 20 caracteres.') {
        return 'O quarto não pode ter mais de 20 caracteres.'
    }
    if (message === 'O quarto deve ter pelo menos 1 caracteres.') {
        return 'O quarto deve ter pelo menos 1 caracteres.'
    }
    if (message === 'O endereço não pode ter mais de 20 caracteres.') {
        return 'O endereço não pode ter mais de 20 caracteres.'
    }
    if (message === 'O endereço deve ter pelo menos 1 caracteres.') {
        return 'O endereço deve ter pelo menos 1 caracteres.'
    }
    if (message === 'O endereço não pode ter mais de 20 caracteres.') {
        return 'O endereço não pode ter mais de 20 caracteres.'
    }
    if (message === 'O endereço deve ter pelo menos 1 caracteres.') {
        return 'O endereço deve ter pelo menos 1 caracteres.'
    }
    return 'Ocorreu um erro inesperado'
}
