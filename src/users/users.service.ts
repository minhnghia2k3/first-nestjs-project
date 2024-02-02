import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class UsersService {
  private users = [
    {
      id: 101,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      role: 'INTERN',
    },
    {
      id: 102,
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
      role: 'ADMIN',
    },
    {
      id: 103,
      name: 'Charlie Davis',
      email: 'charlie.davis@example.com',
      role: 'ENGINEER',
    },
    {
      id: 104,
      name: 'David Miller',
      email: 'david.miller@example.com',
      role: 'INTERN',
    },
    {
      id: 105,
      name: 'Eva Brown',
      email: 'eva.brown@example.com',
      role: 'ENGINEER',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const filteredUser = this.users.filter((user) => user.role === role);
      if (filteredUser.length === 0)
        throw new NotFoundException(`Not found user with role ${role}`);
      return filteredUser;
    }
    return [this.users];
  }
  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User is not found');
    return user;
  }
  create(createUserDto: CreateUserDto) {
    // Sort by the highest user id
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });
    return this.findOne(id);
  }
  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
