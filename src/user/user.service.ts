import { Injectable } from '@nestjs/common';
import { EditUserDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService){}

    async editUser(id: number, dto: EditUserDto) {      
        const user = await this.prismaService.user.update({
          where: { id },
          data: { ...dto },
        });
      
        const { password, ...res } = user;
        return res;
      }
}
