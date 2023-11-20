const puppeteer = require("puppeteer");
const fs = require("fs");
require('dotenv').config()

const credentials = require("./credentials.json")

const { SPREADSHEET_ID, KEY, EMAIL, URL_MAIN } = process.env
const sheetIndex = 0;

const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");

const openSheet = async () => {
    const serviceAccountAuth = new JWT({
        email: credentials.client_email,
        key: credentials.private_key,
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

const urlProject = URL_MAIN;

(async () => {

    const browser = await puppeteer.launch({
        headless: "new",
        defaultViewport: null, // Disable the default viewport
        timeout: 0, // Set the timeout to zero to disable it
    });
    const page = await browser.newPage();

    await page.goto(`${urlProject}`);
    await page.setViewport({ width: 2560, height: 929 });

    // Fecha popup cep
    await page.click("#closeMultiCD");

    // Captura os dados do produto
    let links = [];
    let cont = 0;
    console.log(`Inicio do processo`);

    while (true) {

        //await page.waitForSelector(".i.angle.right.icon");
        await page.waitForTimeout(5000);
        // Capturar todos os links da página atual
        const currentLinks = await page.$$eval(
            ".card.produto.product-in-card",
            (elements) => {
                return elements.map((item) => {
                    const nameElement = item.querySelector(`[itemprop="name"]`);
                    const priceElement =
                        item.querySelector(`[itemprop="price"]`);
                    const hrefElement = item.querySelector(`a`);

                    const title = nameElement ? nameElement.innerText : "";
                    const price = priceElement
                        ? `${priceElement.content} BRL`
                        : "";
                    const link = hrefElement ? hrefElement.href : "";
                    const availability = priceElement
                        ? "in stock"
                        : "out of stock";
                    const brand = "Usiminas";
                    const google_product_category =
                        "Ferragens > Materiais de construção";

                    return {
                        title,
                        price,
                        link,
                        availability,
                        brand,
                        google_product_category,
                    };
                });
            }
        );

        links = links.concat(currentLinks);

        const nextButtonExists = await page.evaluate(() => {
            const button = document.querySelectorAll(
                "#nextPage.disabled.item"
            ).length;
            return button == 0; // Verifica se o elemento existe na página
        });

        if (nextButtonExists) {
            cont++;
            console.log(`O botão 'Next' existe na página [${cont}].`);

            const nextButton = await page.$("#nextPage");
            await nextButton.evaluate((btn) => btn.click());

            // Aguardar até que a página carregue os novos links
            await page.waitForSelector(".card.produto.product-in-card");

            // Aguardar um pequeno intervalo de tempo para garantir que todos os elementos sejam carregados corretamente
            await page.waitForTimeout(1000);
        } else {
            console.log("O botão 'Next' não existe na página.");
            break; // Se não houver botão "Next", sair do loop
        }
    }


    dataproduct = [];
    contProduct = 0;
    const linksValidos = links.filter((item) => item.link);

    for (const item of linksValidos) {
        await page.goto(item.link);
        const hasProduct = await page.waitForSelector("#produto-id");
        if(hasProduct){
        contProduct++;
        console.log(
            ` -------------------- [${contProduct}/${links.length}] --------------------`
        );

        const {
            title,
            link,
            price,
            availability,
            brand,
            google_product_category,
        } = item;

        const condition = "new";

        const { id, mpn, image_link, description, product_type } =
            await page.evaluate(() => {
                const productIDElement = document.querySelector(`#produto-id`)
                    ? document.querySelector(`#produto-id`).value
                    : "";
                const productSKUElement = document.querySelector(`#produto-sku`)
                    ? document.querySelector(`#produto-sku`).value
                    : "";
                const productCodeElement = document.querySelector(
                    `#produto-codigo`
                )
                    ? document.querySelector(`#produto-codigo`).value
                    : "";
                const descriptionElement = document.querySelector(
                    `[property="og:description"]`
                )
                    ? document.querySelector(`[property="og:description"]`)
                          .content
                    : "";

                const textJson = [
                    ...document.querySelectorAll(
                        `script[type="application/ld+json"]`
                    ),
                ].map((script) => JSON.parse(script.textContent));
                const productJson = textJson.filter(
                    (item) => item["@type"] === "Product"
                );

                const product_typeElement = String(
                    [...document.querySelectorAll(`.breadcrumb a`)]
                        .map((item) => item.innerText)
                        .filter((item) => item.replace("HOME", "") != "")
                ).replace(`,`, ` > `);

                const image_linkElement = productJson[0]?.image;
                //const descriptionElement = productJson[0]?.description;

                return {
                    id: `${productIDElement}_${productSKUElement}`,
                    mpn: productCodeElement,
                    image_link: image_linkElement,
                    description: descriptionElement,
                    product_type: product_typeElement,
                };
            });

        dataproduct.push({
            id,
            title,
            description,
            link,
            condition,
            price,
            availability,
            image_link,
            mpn,
            brand,
            google_product_category,
            product_type,
        }); 

        }else{
            await page.waitForTimeout(1000);
        }
    }

    openSheet()
        .then(async ({ doc, sheet }) => {

            await sheet.clear()            
            const rows = Object.keys(dataproduct[0]);
            await sheet.setHeaderRow(rows);

            await sheet.addRows(dataproduct);
        })
        .catch((error) => {
            console.error("Error:", error);
        });

    await browser.close();
})();
