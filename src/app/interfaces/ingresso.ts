export interface Ingresso{
    id:number;
    nome:string;
    tipo: 'VIP' | 'STANDARD' | 'MEIA';
    data: Date;
    preco:number;
    descricao:string;
}