import { v4 as uuid } from 'uuid';

export class Cliente{
    id?: string;
    nome?: string;
    email?: string;
    cpf?: string;
    dataNascimento?: Date;
    uf?: string;
    municipio?: string;

    static newCliente = (): Cliente => {
        const cliente: Cliente = { id: uuid() };
        return cliente;
    };
}
