import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';

import { UserDto } from './dto/user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
    private jwtService: JwtService,
  ) {}

  private async generateToken(user: User) {
    const payload = { id: user.id, username: user.username };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async loginUser(userDto: UserDto) {
    const { id } = userDto;

    const [user, created] = await User.findOrCreate({
      where: { id },
      defaults: {
        ...userDto,
      },
    });

    if (created) {
      return this.generateToken(user);
    }
    await User.update({ ...userDto }, { where: { id: user.id } });
    return this.generateToken(user);
  }
}
