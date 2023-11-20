const puppeteer = require("puppeteer");
const fs = require("fs");
const args = process.argv;
let urlIndex = -1; // Inicializa com um valor inválido para indicar que o parâmetro -u não foi encontrado

for (let i = 0; i < args.length; i++) {
  if (args[i] === '-u') {
    urlIndex = i;
    break;
  }
}

if (urlIndex !== -1) {
  const dominio = args[urlIndex + 1]; // Obtém o valor após o parâmetro -u
  console.log(`Parâmetro -u encontrado. Domínio: ${dominio}`);
} else {
  console.log('Parâmetro -u não encontrado.');
}

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    const website = "www.cmsaccount.com";
    await page.goto(`https://www.google.com/search?q=site:https://${website}/`);
    await page.setViewport({ width: 1536, height: 864 });

    // Capturar os dados do produto
    let links = [];

    while (true) {
      // Capturar todos os links da página atual
      const currentLinks = await page.$$eval("#search a", (elements) => {
        return elements.map((item) => ({
          url: item.href
        }));
      });

      // Adicionar os links da página atual à lista de links
      links = links.concat(currentLinks);

      await page.waitForTimeout(3000);
      // Verificar se há um botão "Next" na paginação
      const nextButton = await page.$('#pnnext');
      if (!nextButton) {
        break; // Se não houver botão "Next", sair do loop
      }

      // Clicar no botão "Next"
      await Promise.all([
        page.waitForNavigation(), // Esperar pela navegação para a próxima página
        nextButton.click(),
      ]);
    }

    // Transformar os links em um array JSON
    const jsonLinks = JSON.stringify(links);

    console.log(jsonLinks);

    // Escrever os links em um arquivo JSON
    fs.writeFile(`${website}-links.json`, jsonLinks, "utf8", (err) => {
      if (err) {
        console.error("Erro ao gravar o arquivo JSON:", err);
      } else {
        console.log("Arquivo JSON gravado com sucesso.");
      }
    });

    await browser.close();
  } catch (error) {
    console.error("Erro durante a execução:", error);
  }
})();