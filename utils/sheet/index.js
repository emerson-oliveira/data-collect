const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");

const sheetIndex = 1;



const openSheet = async ({SPREADSHEET_ID, EMAILSERVICE, PASSSERVICE}) => {
    const serviceAccountAuth = new JWT({
        email: `${EMAILSERVICE}`,
        key: `${PASSSERVICE}`,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[sheetIndex];

    return {
        doc,
        sheet,
    };
};




async function saveDataSheet(dataSource, {SPREADSHEET_ID, EMAILSERVICE, PASSSERVICE} ){

    
    await openSheet({SPREADSHEET_ID:SPREADSHEET_ID, EMAILSERVICE:EMAILSERVICE, PASSSERVICE:PASSSERVICE})
    .then(async ({ doc, sheet }) => {
        console.log("Iniciado");
        await sheet.clear();
        console.log("Todas as linhas foram deletadas!");
        const rows = Object.keys(dataSource);
        await sheet.setHeaderRow(rows);
        await sheet.addRows(dataSource);
        console.log("----> Dados atualizados");
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}

//console.log(saveDataSheet(dataSource));
module.exports = saveDataSheet; 