import { Controller, Post, Get, Param, Delete, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() body: { email: string, password: string }): Promise<User> {
    return this.userService.createUser(body.email, body.password);
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Get(':id/columns')
  async getUserColumns(@Param('id') id: number): Promise<User> {
    return this.userService.findUserColumns(id);
  }

  @Delete(':userId/columns/:id')
  async deleteUserColumn(
    @Param('userId') userId: number,
    @Param('id') columnId: number
  ): Promise<void> {
    return this.userService.deleteUserColumn(userId, columnId);
  }
}
