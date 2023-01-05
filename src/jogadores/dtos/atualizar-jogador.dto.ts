import { IsNotEmpty } from "class-validator";

//Aqui são determinados os dados que a api precisa necessariamente receber do usuário na requisição;

export class AtualizarJogadorDto {

  @IsNotEmpty()
  readonly telefoneCelular: string;

  @IsNotEmpty()
  readonly nome: string;
}