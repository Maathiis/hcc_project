import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity, UserRole } from './user.entity';
import { UserDto } from './userCreate.dto';
import { Roles } from 'src/guards/roles.decorateur';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    // Création d'utilisateur
    @Post('create')
    async createUser(@Body() createUserDto: UserDto): Promise<UserEntity> {
        return this.userService.createUser(createUserDto);
    }  

    @Post('validate/:id')
    @Roles(UserRole.ADMIN) 
    @UseGuards(RolesGuard)  
    async validateUser(@Param('id') id: number): Promise<UserEntity> {
      return this.userService.validateUser(id);
    }
}