import bcrypt from "bcrypt"
import client from "../database"

const {BCRYPT_PASSWORD, SALT_ROUNDS, PEPPER} = process.env

export interface BaseUser {
  firstname: string;
  lastname: string;
}

export interface BaseAuthUser extends BaseUser {
  username: string;
  password: string;
}

export interface User extends BaseAuthUser {
  id: number;
}

export class UserStore {
  async index (): Promise<User[]> {
    try {
      const connection = await client.connect()
      const sql = "SELECT * FROM users"

      const {rows} = await connection.query(sql)

      connection.release()

      return rows
    } catch (err) {
      throw new Error(`Could not get users. ${err}`)
    }
  }

  async create (u: User): Promise<User> {
    try {
      const conn = await client.connect()
      const sql = "INSERT INTO users (firstname, lastname, username, password_digest) VALUES($1, $2, $3, $4) RETURNING *"
      const hash = bcrypt.hashSync(
        u.password + PEPPER,
        parseInt(SALT_ROUNDS as string, 10)
        // parseInt(saltRounds)
    );

      const result = await conn.query(sql, [u.username, hash])
      const user = result.rows[0]

      conn.release()

      return user
    } catch (err) {
      throw new Error(`Could not add new user (${u.username}): ${err}`)
    }
  }

  async read (id: number): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)"
      const connection = await client.connect()
      const {rows} = await connection.query(sql, [id])

      connection.release()

      return rows[0]
    } catch (err) {
      throw new Error(`Could not find user ${id}. ${err}`)
    }
  }

  async update (id: number, newUserData: BaseUser): Promise<User> {
    const {firstname, lastname} = newUserData

    try {
      const sql = "UPDATE users SET firstname = $1, lastname = $2 WHERE id = $3 RETURNING *"
      const connection = await client.connect()
      const {rows} = await connection.query(sql, [firstname, lastname, id])

      connection.release()

      return rows[0]
    } catch (err) {
      throw new Error(`Could not update user ${firstname} ${lastname}. ${err}`)
    }
  }

  async deleteUser (id: number): Promise<boolean> {
    try {
      const sql = "DELETE FROM users WHERE id=($1)"
      const connection = await client.connect()

      await connection.query(sql, [id])

      connection.release()

      return true
    } catch (err) {
      throw new Error(`Could not delete user ${id}. ${err}`)
    }
  }

  async authenticate (username: string, password: string): Promise<User | null> {
      const conn = await client.connect()
      const sql = "SELECT password_digest FROM users WHERE username=($1)"

      const result = await conn.query(sql, [username])

      if (result.rows.length) {
        const user = result.rows[0]
        console.log(user)

        if (bcrypt.compareSync(password+PEPPER, user.password_digest)) {
          return user
        }
      }

      return null
  }
}
