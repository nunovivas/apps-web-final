import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
// Se houver tempo, passar tudo para uma tabela de utilizadores
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'nuno',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'roberto',
      password: 'guess',
    },
    {
      userId: 3,
      username: 'joana',
      password: 'changeme',
    },
    {
      userId: 4,
      username: 'canhoto',
      password: 'changeme',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
