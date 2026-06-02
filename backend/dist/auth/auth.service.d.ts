import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { LoginDto, RegisterDto } from './dto/auth.dto';
export declare class AuthService {
    private readonly userRepo;
    private readonly jwtService;
    constructor(userRepo: Repository<User>, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        id: number;
        nome: string;
        email: string;
        perfil: string;
        criadoEm: Date;
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
        usuario: {
            id: number;
            nome: string;
            email: string;
            perfil: string;
        };
    }>;
    findAll(): Promise<{
        id: number;
        nome: string;
        email: string;
        perfil: string;
        criadoEm: Date;
    }[]>;
    remove(id: number): Promise<void>;
}
