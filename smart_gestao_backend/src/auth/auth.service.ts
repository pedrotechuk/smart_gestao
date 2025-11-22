import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Pool } from 'mysql2/promise';


@Injectable()
export class AuthService {
  constructor(
    @Inject('DB_CONNECTION') private db: Pool,
    private jwtService: JwtService,
  ) {}

  async login(username: string, senha: string) {
    console.log("ANTES DA QUERY");
const [rows]: any = await this.db.query(
  'SELECT * FROM usuarios WHERE username = ? LIMIT 1',
  [username],
);
console.log("DEPOIS DA QUERY");


    const user = rows[0];

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    if (user.senha !== senha) { // depois trocamos pra hash
      throw new UnauthorizedException('Senha inválida');
    }

    const token = await this.jwtService.signAsync({
      id: user.id,
      empresa_id: user.empresa_id,
      perfil_id: user.perfil_id,
    });

    return { token };
  }
}
