import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  name: string;
  username: string;
  password: string;
  role: string;
  department: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    username,
    password,
    role,
    department,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByUsername(username);

    if (checkUserExists) {
      throw new AppError('Username address already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      username,
      password: hashedPassword,
      role,
      department,
    });

    return user;
  }
}

export default CreateUserService;
