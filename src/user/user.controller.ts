import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from '../../generated/prisma';
import { getUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService){}

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@getUser("") user: User) {
    return user;
  }

  @UseGuards(JwtGuard)
  @Patch()
  editUser(
    @getUser('id') userId: number,
    @Body() dto: EditUserDto
  ){
    return this.userService.editUser(userId, dto);
  }
}
