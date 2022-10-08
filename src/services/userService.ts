import bcrypt from "bcrypt";
import { DATABASE_NAME, Tables } from "../db/db.constants";
import { executeQuery } from "../db/queryExecuter";
import _ from "lodash";

class UserService {
  tableName = Tables.users;

  async createNewUser(username: string, plainTextPassword: string) {
	if(!_.isEmpty(await this._getUser(username))){ //should be a part of validation
		throw new Error("username already exists");
	}

	//todo - validation with yup
	try{
		return await this._createSecureNewUser(username, plainTextPassword);
	} catch (err) {
		throw err;
	}
  }

  async _createSecureNewUser(username: string, plainTextPassword: string){
	await bcrypt.hash(plainTextPassword, 10, async (err, hash) => {
		if(hash){
        const query = `
            INSERT INTO ${DATABASE_NAME}."${this.tableName}"
            ("username", "password")
            VALUES ('${username}', '${hash}')
            ;`;
        return await executeQuery(query);
		}
		throw err;
    });
  }

  async _getUser(username: string) {
	const query = `
	SELECT u."username", u."password" 
	FROM ${DATABASE_NAME}."${this.tableName}" as u
	WHERE u."username" = '${username}';`;
	return await executeQuery(query);
  }
}

export const userService = new UserService();
