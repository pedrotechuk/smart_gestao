import { 
  Controller, Get, Param, Post, Body, Put, Delete 
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // GET /users
  @Get()
  async findAll() {
    return this.usersService.getUsuarios();
  }

  // GET /users/:id
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.getUsuarioById(Number(id));
  }

  // POST /users
  @Post()
  async create(@Body() body: { username: string; senha: string; empresa_id: number; perfil_id: number }) {
    return this.usersService.createUsuario(body);
  }

  // PUT /users/:id
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.usersService.updateUsuario(Number(id), body);
  }

  // DELETE /users/:id
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usersService.deleteUsuario(Number(id));
  }
}
