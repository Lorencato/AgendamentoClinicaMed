import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    me(req: any): any;
    findAll(): Promise<{
        id: number;
        nome: string;
        email: string;
        perfil: string;
        criadoEm: Date;
    }[]>;
    remove(id: number): Promise<void>;
}
