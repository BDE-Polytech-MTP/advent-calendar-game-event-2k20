import { Controller, Get, Query, Post, Body, Put, Param, UseGuards, Render, Optional, Redirect } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UserDTO } from './user.dto';
import { AuthGuard } from './auth.guard';

@Controller()
export class UsersController {
  
  constructor(private readonly usersService: UsersService) {}

  @Get('new')
  @UseGuards(AuthGuard)
  @Render('new')
  createUser(@Query('token') token: string) {
    return { token };
  }

  @Post('users')
  @UseGuards(AuthGuard)
  @Redirect('/')
  async insertUser(@Body() body: UserDTO, @Query('token') token: string) {
    const user: User = {
      id: null,
      ... body,
    };
    await this.usersService.insert(user);
    return { url: '/?token=' + token };
  }

  @Get()
  @Render('index')
  async listUsers(@Query('token') token?: string) {
    return { 
      users: await this.usersService.findAll(), 
      admin: token == process.env.ADMIN_TOKEN,
      token,
    };
  }

  @Post('users/:id')
  @UseGuards(AuthGuard)
  @Redirect('/')
  async updateUser(@Body() body: UserDTO, @Param('id') id: number, @Query('token') token?: string) {
    const user: User = {
      id,
      ... body
    };
    await this.usersService.update(user);
    return { url: '/?token=' + token };
  }

  @Get('users/:id')
  @UseGuards(AuthGuard)
  @Render('edit')
  async editUser(@Param('id') id: string, @Query('token') token: string) {
    return {
      user: await this.usersService.findOne(id),
      token,
    }
  }

  @Post('users/:id/delete')
  @UseGuards(AuthGuard)
  @Redirect('/')
  async removeUser(@Param('id') id: string, @Query('token') token: string) {
    await this.usersService.remove(id);
    return { url: '/?token=' + token };
  }
  
}
