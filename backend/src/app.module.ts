import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacientesModule } from './pacientes/pacientes.module';
import { MedicosModule } from './medicos/medicos.module';
import { ConsultasModule } from './consultas/consultas.module';
import { AuthModule } from './auth/auth.module';
import { Paciente } from './pacientes/paciente.entity';
import { Medico } from './medicos/medico.entity';
import { Consulta } from './consultas/consulta.entity';
import { User } from './auth/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST', 'localhost'),
        port: parseInt(config.get('DB_PORT', '3306')),
        username: config.get('DB_USERNAME', 'root'),
        password: config.get('DB_PASSWORD', ''),
        database: config.get('DB_DATABASE', 'clinica_db'),
        entities: [Paciente, Medico, Consulta, User],
        synchronize: true,
      }),
    }),
    AuthModule,
    PacientesModule,
    MedicosModule,
    ConsultasModule,
  ],
})
export class AppModule {}