import { IsNotEmpty, IsEmail, IsString, IsOptional } from "class-validator";

//Aqui são determinados os dados que a api precisa necessariamente receber do usuário na requisição;

export class CriarJogadorDto {

  @IsNotEmpty()
  readonly telefoneCelular: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly nome: string;
}