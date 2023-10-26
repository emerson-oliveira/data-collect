const fs = require("fs");
const dir = './output';

const jsonSave = (dataSource, filename = "report")=>{
    
    if (!fs.existsSync(dir)){
        try {
            fs.mkdirSync(dir);
            console.log('Diretório criado com sucesso!');
        } catch (err) {
            console.error('Falha ao criar o diretório:', err);
        }
    }

    fs.writeFile(
        `./output/${filename}.json`,
        JSON.stringify(dataSource),
        "utf8",
        (err) => {
            if (err) {
                console.error("Erro ao gravar o arquivo JSON:", err);
            } else {
                console.log("Arquivo JSON gravado com sucesso.");
            }
        }
    );
}

//jsonSave(dataSource, "datasource")
module.exports = jsonSave;