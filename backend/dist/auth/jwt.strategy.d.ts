import { Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from './user.entity';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userRepo;
    constructor(userRepo: Repository<User>);
    validate(payload: {
        sub: number;
        email: string;
    }): Promise<{
        id: number;
        nome: string;
        email: string;
        perfil: string;
        criadoEm: Date;
    }>;
}
export {};
