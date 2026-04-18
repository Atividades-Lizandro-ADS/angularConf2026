import { Ingresso } from "../interfaces/ingresso";
import { DESCRICOES } from "./descs"; 

export const mockIngressos:Ingresso[] =[
    {
      id: 1,
      nome: 'Angular Conf 2026',
      tipo: 'VIP',
      data: new Date('2026-09-15'),
      preco: 150,
      descricao: DESCRICOES['VIP'],
    },
    {
      id: 2,
      nome: 'Angular Conf 2026',
      tipo: 'STANDARD',
      data: new Date('2026-09-15'),
      preco: 100,
      descricao: DESCRICOES['STANDARD'],
    },
    {
      id: 3,
      nome: 'Angular Conf 2026',
      tipo: 'MEIA',
      data: new Date('2026-09-15'),
      preco: 50,
      descricao: DESCRICOES['MEIA'],
    },
  ]