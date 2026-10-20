class HomePage{

    // Arrange - Prepara
    // Mapear os elementos

    //toda classe de mapeamento de pag tem q ter um constructor e page pra chamar o playwright web
    constructor(page){
        //playwright de dentro (desta pag q estamos mexendo) c/ pw de fora, mundo de forma com mundo dentro da classe
        this.page = page //esta linha tem q ser assim, eh padrao
        //vamos mapear voo
        this.origem = '[name="fromPort"]' //pegando os seletores da pagina
        this.destino = '[name="toPort"]'
        this.btnFindFlights = '.btn.btn-primary' //nao precisa colchetes pq eh uma classe
    }

    // Act - Executar
    // Mapear as acoes - selecionar a viagem
    async selecionar_viagem(origem, destino){//variaveis origem e destino
        //se tem async tem await
        await this.page.locator(this.origem).selectOption(origem)
        await this.page.locator(this.destino).selectOption(destino)
        await this.page.locator(this.btnFindFlights).click()
    }

    //Assert - Valida: a gente faz no teste (antes nos mapeamos os elementos, acima)
    

    
}