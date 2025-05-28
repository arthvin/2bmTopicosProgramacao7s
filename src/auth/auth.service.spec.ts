import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
    let service: AuthService;
    let userRepository: Repository<User>;
    let jwtService: JwtService;

    const mockUserRepository = {
        findOne: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
    };

    const mockJwtService = {
        sign: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: getRepositoryToken(User),
                    useValue: mockUserRepository,
                },
                {
                    provide: JwtService,
                    useValue: mockJwtService,
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        userRepository = module.get<Repository<User>>(getRepositoryToken(User));
        jwtService = module.get<JwtService>(JwtService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('register', () => {
        it('deve registrar um novo usuário com senha criptografada', async () => {
            mockUserRepository.findOne.mockResolvedValue(null);
            mockUserRepository.create.mockImplementation(dto => dto);
            mockUserRepository.save.mockResolvedValue({ id: 1, username: 'user1', password: 'hashed' });

            jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed');

            await service.register('user1', 'senha123');

            expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { username: 'user1' } });
            expect(bcrypt.hash).toHaveBeenCalledWith('senha123', 10);
            expect(mockUserRepository.create).toHaveBeenCalledWith({ username: 'user1', password: 'hashed' });
            expect(mockUserRepository.save).toHaveBeenCalled();
        });

        it('deve lançar conflito ao tentar registrar um username já existente', async () => {
            mockUserRepository.findOne.mockResolvedValue({ id: 1, username: 'user1', password: 'hashed' });

            await expect(service.register('user1', 'senha123')).rejects.toThrow(ConflictException);
        });
    });

    describe('validateUser', () => {
        it('deve retornar usuário quando username e senha estiverem corretos', async () => {
            const user = { id: 1, username: 'user1', password: 'hashed' };
            mockUserRepository.findOne.mockResolvedValue(user);
            jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));

            const result = await service.validateUser('user1', 'senha123');
            expect(result).toEqual(user);
        });

        it('deve retornar null quando usuário não existir', async () => {
            mockUserRepository.findOne.mockResolvedValue(null);

            const result = await service.validateUser('user1', 'senha123');
            expect(result).toBeNull();
        });

        it('deve retornar null quando senha for inválida', async () => {
            const user = { id: 1, username: 'user1', password: 'hashed' };
            mockUserRepository.findOne.mockResolvedValue(user);
            jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(false));

            const result = await service.validateUser('user1', 'senhaErrada');
            expect(result).toBeNull();
        });
    });

    describe('login', () => {
        it('deve retornar token JWT para usuário válido', async () => {
            const user = { id: 1, username: 'user1', password: 'hashed' };
            jest.spyOn(service, 'validateUser').mockResolvedValue(user);
            mockJwtService.sign.mockReturnValue('token123');

            const result = await service.login('user1', 'senha123');
            expect(service.validateUser).toHaveBeenCalledWith('user1', 'senha123');
            expect(mockJwtService.sign).toHaveBeenCalledWith({ username: user.username, sub: user.id });
            expect(result).toEqual({ access_token: 'token123' });
        });

        it('deve lançar UnauthorizedException para usuário inválido', async () => {
            jest.spyOn(service, 'validateUser').mockResolvedValue(null);

            await expect(service.login('user1', 'senhaErrada')).rejects.toThrow(UnauthorizedException);
        });
    });
});
