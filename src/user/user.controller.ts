import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/user.dto';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Post('verify/:id/:role')
    async login(@Body() userDto: UserDto) {
    }

}