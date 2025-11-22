import { Injectable, Inject, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(@Inject('DB_CONNECTION') private db) {}

  // LISTAR TODOS USUÁRIOS
  async getUsuarios() {
    const [rows] = await this.db.query("SELECT * FROM usuarios");
    return rows;
  }

  // PEGAR UM USUÁRIO POR ID
  async getUsuarioById(id: number) {
    const [rows] = await this.db.query("SELECT * FROM usuarios WHERE id = ?", [id]);
    if (!rows.length) throw new NotFoundException("Usuário não encontrado");
    return rows[0];
  }

  // CRIAR USUÁRIO
  async createUsuario(data: { username: string; senha: string; empresa_id: number; perfil_id: number }) {
    const sql = `
      INSERT INTO usuarios (username, senha, empresa_id, perfil_id)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await this.db.query(sql, [
      data.username,
      data.senha,
      data.empresa_id,
      data.perfil_id
    ]);

    return { id: result.insertId, ...data };
  }

  // ATUALIZAR USUÁRIO
  async updateUsuario(id: number, data: any) {
    const sql = `
      UPDATE usuarios SET
      username = ?, senha = ?, empresa_id = ?, perfil_id = ?
      WHERE id = ?
    `;

    await this.db.query(sql, [
      data.username,
      data.senha,
      data.empresa_id,
      data.perfil_id,
      id,
    ]);

    return this.getUsuarioById(id);
  }

  // DELETAR USUÁRIO
  async deleteUsuario(id: number) {
    await this.db.query("DELETE FROM usuarios WHERE id = ?", [id]);
    return { message: "Usuário removido com sucesso" };
  }
}
