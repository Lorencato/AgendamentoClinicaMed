import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existe = await this.userRepo.findOne({ where: { email: dto.email } });
    if (existe) throw new ConflictException('E-mail já cadastrado');

    const hash = await bcrypt.hash(dto.senha, 10);
    const user = this.userRepo.create({ ...dto, senha: hash });
    const saved = await this.userRepo.save(user);
    const { senha, ...result } = saved;
    return result;
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    const senhaCorreta = await bcrypt.compare(dto.senha, user.senha);
    if (!senhaCorreta) throw new UnauthorizedException('Credenciais inválidas');

    const payload = { sub: user.id, email: user.email, nome: user.nome, perfil: user.perfil };
    return {
      access_token: this.jwtService.sign(payload),
      usuario: { id: user.id, nome: user.nome, email: user.email, perfil: user.perfil },
    };
  }

  async findAll() {
    const users = await this.userRepo.find({ order: { nome: 'ASC' } });
    return users.map(({ senha, ...u }) => u);
  }

  async remove(id: number) {
    await this.userRepo.delete(id);
  }
}