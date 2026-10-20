//Frameworks, pacotes, bibliotecas
import { test, expect } from '@playwright/test'

//Funcoes ou metodos para fazer os testes no playwright: request para API e page para WEB
// => arrow function
//Inicio teste Comprar Passagem
test('Comprar Passagem', async ( {page} ) => {
    //abrir o navegador (promessa): page para o plawrgiht e o q eu quero fazer no playwright
    await page.goto('https://www.blazedemo.com')

    //selecionar as cidades de origem e destino, clicar em Find Flights
    //sempre q for trabalhar com um elemento da tela = locator
    //localizador para encontrar um elemento na pagina
    //select = qdo eh uma lista, um select
    await page.locator('select[name="fromPort"]').selectOption("São Paolo")
    await page.locator('select[name="toPort"]').selectOption("London")

    //como eh uma classe coloca . e no lugar do espaço coloca . tb
    //botao sempre é click
    await page.locator('.btn.btn-primary').click()

    //ao fazer isso no site: from SP to London e clicar no Find Flights, mudou de tela
    //verificar o endereco da pagina e o texto ancora: voo de sp para london
    //pegar o endereco da URL
    //sempre q eh validacao comeca com await expect
    //page.locator qdo eh acao e expect(page.locator) qdo eh pra procurar algo
    await expect(page).toHaveURL(/reserve\.php/)
    await expect(page.locator('h3')).toHaveText('Flights from São Paolo to London: ')

    //selecionar o botao com base nas infos do voo
    await page.getByRole('row',
     { name: 'Choose This Flight 9696 Aer Lingus	5:27 AM	8:22 PM	$200.98'})
     .getByRole('button').click()

     // espera a página carregar antes de prosseguir
    //await page.waitForURL(/purchase\.php/);

    //ao clicar no botao Choose This Flight vai para uma outra pagina
    //verficar o endereco da pagina e o texto ancora = texto especial
    await expect(page).toHaveURL(/purchase\.php/)
    await expect(page.locator('h2')).toHaveText('Your flight from TLV to SFO has been reserved.')

    //preencher 1o nome, bandeira cartao e lembre-se de mim checkbox
    //id eh com #
    await page.locator('#inputName').fill('Flavia')
    await page.locator('#cardType').selectOption('amex')
    await page.locator('#rememberMe').check()

    //clicar no botao Purchase Flight
    await page.locator('.btn-primary').click()

    //ao clicar no botao Purchase Flight vai para uma outra pagina
    //verficar o endereco da pagina e o texto ancora = texto especial
    await expect(page).toHaveURL(/confirmation\.php/)
    await expect(page.locator('h1')).toHaveText('Thank you for your purchase today!')

    //verificar o preco da passagem (amount)
    await expect(page.getByRole('row', { name: 'Amount	555 USD'})).toBeVisible()

})
//Fecha o teste Comprar Passagem
