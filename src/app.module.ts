import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesController } from './employees/employees.controller';
import { EmployeesService } from './employees/employees.service';
import { EmployeesModule } from './employees/employees.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MyLoggerModule } from './my-logger/my-logger.module';
@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'long',
        ttl: 60000, // 60s
        limit: 10, // In 60s - send maximum 10 reqs
      },
      {
        name: 'short',
        ttl: 1000, // 1s
        limit: 3, // In 1 - send maximum 3 reqs
      },
    ]),
    UsersModule,
    DatabaseModule,
    EmployeesModule,
    MyLoggerModule,
  ],
  controllers: [AppController, EmployeesController],
  providers: [
    AppService,
    EmployeesService,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
