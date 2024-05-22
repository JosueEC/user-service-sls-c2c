import { Client } from 'pg';

/**
 * Configuración de la conexión con PostgreSQL a traves del
 * modulo Client de la librería de 'pg'
 * @returns 
 */
export const DBCLient = async () => {
    return new Client({
        host: 'localhost',
        user: 'root',
        database: 'user_service',
        password: 'root',
        port: 5432,
    });
};