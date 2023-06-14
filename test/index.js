const puppeteer = require("puppeteer");
const fs = require("fs");
require('dotenv').config();

const urlProject = process.env.URL_MAIN;

(async () => {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();

    await page.goto(`${urlProject}`);
    await page.setViewport({ width: 2560, height: 929 });

    // Fecha popup cep
    await page.click("#closeMultiCD");

    // Captura os dados do produto
    let links = [];
    let cont = 0
    console.log(`Inicio do processo`);

    while (true) {

        // Capturar todos os links da página atual
        const currentLinks = await page.$$eval(".card.produto.product-in-card", elements => {
            return elements.map((item) => {
                const nameElement = item.querySelector(`[itemprop="name"]`);
                const priceElement = item.querySelector(`[itemprop="price"]`);
                const idElement = item.querySelector(`[itemprop="price"]`);
                const hrefElement = item.querySelector(`a`);
        
                const id = idElement ? idElement: "";
                const title = nameElement ? nameElement.innerText : "";
                const price = priceElement ? `${priceElement.content} BRL` : "";
                const link = hrefElement ? hrefElement.href : "";
                const availability = priceElement ? "in stock" : "out of stock";
                const brand = "Usiminas";
                const google_product_category = "Ferragens > Materiais de construção";
        
                return {
                  title,
                  price,
                  link,
                  availability,
                  brand,
                  google_product_category
                };
            });
        });

        links = links.concat(currentLinks);

        const nextButtonExists = await page.evaluate(() => {
            const button = document.querySelectorAll("#nextPage.disabled.item").length;            ;
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
    // Transformar os links em um array JSON
    const jsonLinks = JSON.stringify(links);

    console.log(jsonLinks);

    // Escrever os links em um arquivo JSON
    fs.writeFile("./output/links.json", jsonLinks, "utf8", (err) => {
        if (err) {
            console.error("Erro ao gravar o arquivo JSON:", err);
        } else {
            console.log("Arquivo JSON gravado com sucesso.");
        }
    });

    await browser.close();
})();
