import { Module } from '@nestjs/common';
import { JogadoresController } from './jogadores.controller';
import { JogadoresService } from './jogadores.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadorSchema } from './interfaces/jogador.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: "Jogador", schema: JogadorSchema }])],
  controllers: [JogadoresController],
  //Só é possível usar umservice por meio de injeção de dependência se ele estiver aqui nesse "providers";
  providers: [JogadoresService],
  //Isso torna possível exportar o que há nesse módulo para outros módulos da aplicação;
  exports: [JogadoresService]
})
export class JogadoresModule {}
