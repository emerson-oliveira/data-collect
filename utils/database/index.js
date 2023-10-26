const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

const updateDatabase = ({jsonFilePath, sqliteFilePath, tableName}) => {
    console.log("[+] Atualização do banco de dados.");

    try {
        // Lendo o arquivo JSON
        const json_data = fs.readFileSync(jsonFilePath, "utf8");
        const data = JSON.parse(json_data);

        // Conectando ao banco de dados SQLite
        const db = new sqlite3.Database(sqliteFilePath);

        // Obtendo os campos da tabela com base no primeiro objeto do array de dados
        const fields = Object.keys(data[0]);

        // Criando a tabela
        const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (${getFieldsDefinition(fields)})`;
        db.run(createTableQuery);

        // Inserindo os dados na tabela
        const insertQuery = `INSERT INTO ${tableName} VALUES (${getInsertPlaceholders(fields)})`;
        const stmt = db.prepare(insertQuery);
        data.forEach((user) => {
            const fieldValues = Object.values(user);
            stmt.run(...fieldValues);
        });
        stmt.finalize();

        // Lendo os dados da tabela
        db.all(`SELECT * FROM ${tableName}`, (err, rows) => {
            if (err) {
                console.error(err);
            } else {
                console.log(rows);
            }
        });

        // Fechando a conexão com o banco de dados
        db.close();
    } catch (error) {
        console.error("Ocorreu um erro ao atualizar o banco de dados:", error);
    }
};

// Função auxiliar para obter a definição dos campos da tabela
const getFieldsDefinition = (fields) => {
    return fields.map((field) => `${field} ${typeof field}`).join(", ");
};

// Função auxiliar para obter os placeholders para inserção dos dados
const getInsertPlaceholders = (fields) => {
    return fields.map(() => "?").join(", ");
};

module.exports = updateDatabase;