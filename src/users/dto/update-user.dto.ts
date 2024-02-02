import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

// Partial: make fields as optional
export class UpdateUserDto extends PartialType(CreateUserDto) {}
