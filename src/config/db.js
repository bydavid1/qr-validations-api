
const mssql = require('mssql');


const sql = {
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    requestTimeout: 130000,
    options: {
        encrypt: false,
        enableArithAbort: false
    }
}

/**
 * @type {mssql.ConnectionPool}
 */
let pool = null;

/**
 * @type {mssql.Transaction} 
 */
let transaction = null;


const closePool = async () => {
    try {
        await pool.close();
        pool = null;
    } catch (err) {
        pool = null;
        console.log(err);
    }
};

/**
 * 
 * @returns {Promise<mssql.ConnectionPool>}
 */
const getConnection = async () => {
    try {
        if (pool) {
            return pool;
        }

        pool = await mssql.connect(sql);
        pool.on('error', async (err) => {
            console.log(err);
            await closePool();
        });

        return pool;
    } catch (err) {
        console.log(err);
        pool = null;
    }
};

/**
 * 
 * @returns {Promise<mssql.Request>}
 */
const request = async () => {
    const connection = await getConnection();

    if (!connection) {
        throw new Error('No se pudo obtener la conexión');
    }

    if (transaction) {
        console.log('Request using transaction');
        return new mssql.Request(transaction)
    } else {
        return new mssql.Request()
    }
};

const beginTransaction = async () => {
    const connection = await getConnection();
    transaction = new mssql.Transaction(connection);
    await transaction.begin();
};

const commitTransaction = async () => {
    if (transaction) {
        await transaction.commit();
        resetTransaction();
    } else {
        throw new Error('No hay transacción activa para realizar commit');
    }
};

const rollbackTransaction = async () => {
    if (transaction) {
        await transaction.rollback();
        resetTransaction();
    } else {
        throw new Error('No hay transacción activa para realizar rollback');
    }
};


const resetTransaction = () => {
    transaction = null;
};

const db = {
    closePool,
    getConnection,
    request,
    beginTransaction,
    commitTransaction,
    rollbackTransaction,
    resetTransaction
};

module.exports = db;
