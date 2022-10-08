import bcrypt from "bcrypt";
import { DATABASE_NAME, Tables } from "../db/db.constants";
import { executeQuery } from "../db/queryExecuter";

class UserService {
  tableName = Tables.users;

  async createNewUser(username: string, plainTextPassword: string) {
    bcrypt.hash(plainTextPassword, 10, async (err, hash) => {
      try {
		if(hash){
        const query = `
            INSERT INTO ${DATABASE_NAME}."${this.tableName}"
            ("username", "password")
            VALUES ('${username}', '${hash}')
            ;`;
        await executeQuery(query);
		}
		throw err;
      } catch (err) {
        throw err;
      }
    });
  }
}

export const userService = new UserService();
