import { DBCLient } from "../config/database-client";
import { UserModel } from "../models/user.model";

export class UserRepository {
    constructor() {}

    async createAccount ({
        phone,
        email,
        password,
        salt,
        userType
    }: UserModel) {
        /**
         * Esta es una forma básica en la que podemos crear una conexión
         * con una base de datos PostgreSQL y ejecutar una query sobre
         * la misma
         */
        const client = await DBCLient();
        await client.connect();

        const queryString = `
            INSERT INTO users(
                phone,
                email,
                password,
                salt,
                user_type) 
            VALUES($1,$2,$3,$4,$5)
            RETURNING *
        `;
        const values = [phone, email, password, salt, userType];

        const result = await client.query(queryString, values);
        await client.end();

        if (result.rowCount > 0) {
            return result.rows[0] as UserModel;
        }
    }

    async findAccount(email: string) {
        const client = await DBCLient();
        await client.connect();

        const queryString = `
            SELECT
                user_id,
                email,
                password,
                phone,
                salt,
                user_type
            FROM users u
            where u.email = $1
        `;
        const values = [email];

        const result = await client.query(queryString, values);
        await client.end();

        if (result.rowCount < 1) {
            throw new Error('user does not exist with provided email');
        }

        return result.rows[0] as UserModel;
    }
}