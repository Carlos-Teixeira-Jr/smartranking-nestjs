import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';

//Esse decorator faz dessa classe um provider, os dados aqui contidos podem ser agora disponibilizados para o controller por injeção de dependências;
@Injectable()
export class JogadoresService {

  constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) {} 

  private readonly logger = new Logger(JogadoresService.name);

  //Salva os dados de jogador em memória/DB;
  async criarJogador(criarJogadorDto: CriarJogadorDto): Promise <Jogador>{

    //Encontra jogador pelo email;
    const { email } = criarJogadorDto;
    
    const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

    if(jogadorEncontrado){
      throw new BadRequestException(`Esse ${email} já foi cadastrado`);
    }
    //Recebe um criarJogadorDto da requisição e persiste ele no MongoDB;
    const jogadorCriado = new this.jogadorModel(criarJogadorDto);
    return await jogadorCriado.save();
  }

  async atualizarJogador(_id: string, atualizarJogadorDto: AtualizarJogadorDto): Promise <void>{

    //const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email);
    const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();

    if(!jogadorEncontrado){
      throw new NotFoundException(`Jogador com o ${_id} não encontrado`)
    }
    await this.jogadorModel.findOneAndUpdate({_id},{$set: atualizarJogadorDto}).exec();
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    //return await this.jogadores;
    return await this.jogadorModel.find().exec();
  }

  async consultarJogadorPeloId(_id: string): Promise<Jogador>{
    const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();
    if(!jogadorEncontrado){
      throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
    }
    return jogadorEncontrado;
  }

  async deletarJogador(_id): Promise<any> {
    const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();

    if(!jogadorEncontrado){
      throw new NotFoundException(`Jogador com email ${_id} não encontrado`);
    }
    return await this.jogadorModel.deleteOne({_id}).exec();
  }
}
