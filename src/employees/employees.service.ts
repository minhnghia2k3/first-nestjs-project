import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { BadRequestException } from '@nestjs/common';
@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    try {
      return await this.databaseService.employee.create({
        data: createEmployeeDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'There is a unique constraint violation',
          );
        }
      }
      throw error;
    }
  }
  async findAll(role?: Role) {
    if (role)
      return await this.databaseService.employee.findMany({
        where: { role },
        select: { email: true },
      });
    return await this.databaseService.employee.findMany();
  }

  async findOne(id: number) {
    return await this.databaseService.employee.findUnique({
      where: { id: id },
    });
  }

  async update(id: number, updateEmployeesDto: Prisma.EmployeeUpdateInput) {
    return await this.databaseService.employee.update({
      where: { id: id },
      data: updateEmployeesDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.employee.delete({
      where: {
        id,
      },
    });
  }
}
