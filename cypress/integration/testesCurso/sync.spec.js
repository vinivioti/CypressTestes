/// <reference types="cypress" />


describe('Esperas ...', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })    
    
    beforeEach(() => {
        cy.reload()
    })
    
    it('Deve aguardar elemento estar dixponivel na tela', () => {
       
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('Funcionou')
       
    
    })

    it('Retryes .. Tentando de novo', () => {
       
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo')
        .should('exist')
        .type('Funcionou')
       
    
    })

    it('Uso do find Modo 1', () => {
        //MODO 1: com GET direto
        cy.get('#buttonList').click()
        cy.get('#lista li')
        .find('span')
        .should('contain','Item 1')

        cy.get('#lista li span')
        .should('contain','Item 2')

    })

    it('Uso do find Modo 2', () => {
      
        cy.get('#buttonList').click()
        cy.get('#lista li')
        .find('span')
        .should('contain','Item 1')

        cy.wait(3000)

        cy.get('#lista li')
        .find('span')
        .should('contain','Item 2')

    })

    it('Uso Timeout', () => {
        
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo', {timeout: 10000}).should('exist')
    
    })

    it('Uso Wait - FIXO', () => {
        //MODO 2: Com Wait
        cy.get('#buttonListDOM').click()
        cy.wait(3000)
        cy.get('#lista li span')
        .should('contain','Item 2')
    
    })

    it.only('Uso Timeout com Listas', () => {
        
        cy.get('#buttonListDOM').click()
        cy.get('#lista li span', {timeout: 10000})
        .should('have.length', 1)
    //    .should('have.length', 2)
    
    })

    it('Busca Listas sem Timeout', () => {
        
        cy.get('#buttonListDOM').click()
        cy.get('#lista li span')
        .should('have.length', 1)
        cy.get('#lista li span')
        .should('have.length', 2)
    
    })

    it('Click Retry', () => {
        
        cy.get('#buttonCount')
        .click()
        .click()
        .should('have.value', '111')
       
    
    })

    it('Should vs Then - Then', () => {
        // O then aguarda para executar o GET 
        cy.get('#buttonListDOM').click()
     //   cy.get('#lista li span').debug()
        cy.get('#lista li span').then($el => {
            console.log($el)
            expect($el).to.have.length(1)
        })
    })     
    
   
    it('Should vs Then - Should', () => {
        // Vai executando os retrys e imprime todo o ciclo
        cy.get('#buttonListDOM').click()
     //   cy.get('#lista li span').debug()
        cy.get('#lista li span').should($el => {
            console.log($el)
            expect($el).to.have.length(1)
        })
    })    

    it('Should vs Then - Should com And', () => {
        cy.get('#buttonListDOM').then($el => {
            //console.log($el)
            expect($el).to.have.length(1)
        }).and('have.id', 'buttonListDOM')
    
    })

    it('Should vs Then - Should com And', () => {
        cy.get('#buttonListDOM').should($el => {
            //console.log($el)
            expect($el).to.have.length(1)
        }).and('have.id', 'buttonListDOM')
    
    })

    it('Should vs Then - Should com And e Retornar o 2 ', () => {
        cy.get('#buttonListDOM').should($el => {
            //console.log($el)
            expect($el).to.have.length(1)
            return 2
        }).and('have.id', 'buttonListDOM')
    
    })

    // it.only('Should vs Then - Should com And e Retornar o 2 com falha ', () => {
    //     cy.get('#buttonListDOM').then($el => {
    //         //console.log($el)
    //         expect($el).to.have.length(1)
    //         return 2
    //     }).and('have.id', 'buttonListDOM')
    
    // })
})