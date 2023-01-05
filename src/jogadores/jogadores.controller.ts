import { Body, Controller, Get, Post, Delete, Query, UsePipes, ValidationPipe, Param, Put } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service'; 
import { Jogador } from './interfaces/jogador.interface';
import { ValidacaoParametrosPipe } from '../common/pipes/validacao-parametros-pipe';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';

@Controller('api/v1/jogadores')
export class JogadoresController {

  //Torna possível, por causa do construtor, o uso desse objeto providenciado pelo service e de seus métodos por meio de injeção de dependências;
  constructor(private readonly jogadoresService: JogadoresService){}

  //Intercepta uma requisição do tipo indicado e para a rota indicada e executa a ação abaixo;
  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(
    @Body() criarJogadorDto: CriarJogadorDto): Promise<Jogador>{

    return await this.jogadoresService.criarJogador(criarJogadorDto)
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(
    @Body() atualizarJogadorDto: AtualizarJogadorDto,
    @Param('_id', ValidacaoParametrosPipe) _id: string): Promise<void>{

    await this.jogadoresService.atualizarJogador(_id, atualizarJogadorDto)
  }

  @Get()
  async consultarJogadores(): Promise<Jogador[]> {
      
      return await this.jogadoresService.consultarTodosJogadores();

    }

  @Get('/:_id')
  async consultarJogadorPeloId(
    @Param('_id', ValidacaoParametrosPipe) _id: string): Promise<Jogador> {
      return await this.jogadoresService.consultarJogadorPeloId(_id);
    }
  
  @Delete('/:_id')
  async deletarJogadorPeloId(
    @Param('_id', ValidacaoParametrosPipe) _id:string): Promise<void> {
      await this.jogadoresService.deletarJogador(_id);
    }
  

}
