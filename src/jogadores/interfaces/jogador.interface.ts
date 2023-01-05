import { Document } from "mongoose";

//Todos os dados que serão salvos no DB, tanto os que precisam necessariamente serem passados pelo usuário quanto os que terão seus valores atribuídos automaticamente e também os dados não obrigatórios;

export interface Jogador extends Document {
  readonly telefoneCelular: string;
  readonly email: string;
  nome: string;
  ranking: string;
  posicaoRanking: number;
  urlFotoJogador: string;
}