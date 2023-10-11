import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, IsPositive } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'este es el email del usuario'})
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'esta es la contraseña del usuario'})
  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly role: string;

  @ApiProperty()
  @IsOptional()
  @IsPositive()
  readonly customerId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
