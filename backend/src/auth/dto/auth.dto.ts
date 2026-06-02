import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsString()
  @IsNotEmpty()
  senha: string;
}

export class RegisterDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
  senha: string;

  @IsOptional()
  @IsString()
  perfil?: string;
}