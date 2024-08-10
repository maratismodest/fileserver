import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GetUserDto } from './dto/get-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  async getCredentialsById(@Param() { id }: GetUserDto): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @ApiOperation({ summary: 'Login' })
  @Post('login')
  login(@Body() userDto: UserDto) {
    return this.usersService.loginUser(userDto);
  }
}
