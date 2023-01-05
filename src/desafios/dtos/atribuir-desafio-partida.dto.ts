import { IsNotEmpty } from 'class-validator';
import { Resultado } from '../interfaces/desafios.interface';
import { Jogador } from '../../jogadores/interfaces/jogador.interface'


export class AtribuirDesafioPartidaDto {

  @IsNotEmpty()
  def: Jogador

  @IsNotEmpty()
  resultado: Array<Resultado>
  
}
