// @ts-ignore
import Client from '../database'

export type Weapon = {
     id: number;
     title: string;
     author: string;
     total_pages: number;
     summary: string;
}

export class WeaponStore {
  async index(): Promise<Weapon[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM mythical_weapons'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not get mythical_weapons. Error: ${err}`)
    }
  }

  async show(id: string): Promise<Weapon> {
    try {
    const sql = 'SELECT * FROM mythical_weapons WHERE id=($1)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find mythical_weapons ${id}. Error: ${err}`)
    }
  }

  async create(b: Weapon): Promise<Weapon> {
      try {
    const sql = 'INSERT INTO mythical_weapons (title, author, total_pages, summary) VALUES($1, $2, $3, $4) RETURNING *'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn
        .query(sql, [b.title, b.author, b.total_pages, b.summary])

    const weapon = result.rows[0]

    conn.release()

    return weapon
      } catch (err) {
          throw new Error(`Could not add new mythical_weapons ${b.title}. Error: ${err}`)
      }
  }

  async delete(id: string): Promise<Weapon> {
      try {
    const sql = 'DELETE FROM mythical_weapons WHERE id=($1)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    const weapon = result.rows[0]

    conn.release()

    return weapon
      } catch (err) {
          throw new Error(`Could not delete mythical_weapons ${id}. Error: ${err}`)
      }
  }
}
