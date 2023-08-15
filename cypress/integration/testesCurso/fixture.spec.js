/// <reference types="cypress" />

describe('Fixture tests', () => {

    it.only('inputando Manualmente os dados', () => {
     //   cy.visit('www.google.com')
     cy.visit('https://wcaquino.me/cypress/componentes.html')

     cy.xpath('//input[@name="formNome"]').type('Foi por xpath')
     cy.xpath('//input[@name="formSobrenome"]').type('OPAAAAA')
     cy.xpath('//input[@id="formSexoMasc"]').click()
     cy.get('#formComidaFrango').click()
     cy.get('#formComidaPizza').click()
     cy.xpath('//select[@id="formEscolaridade"]').select('Superior')
     cy.xpath("//select[@id='formEsportes']").select(['natacao','Karate'])
     cy.xpath("//input[@id='formCadastrar']").click()
     cy.xpath("//span[contains(text(),'Cadastrado!')]")
        .should('have.text', 'Cadastrado!')   
     
    })


    it('Get data form fixture file', function ()  {
        //   cy.visit('www.google.com')
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        cy.fixture('userData').as('usuario').then(() => {
            cy.xpath('//input[@name="formNome"]').type(this.usuario.nome)
            cy.xpath('//input[@name="formSobrenome"]').type(this.usuario.sobrenome)
            cy.xpath(`//input[@name="formSexo" and @value=${this.usuario.sexo}]`).click()
            cy.xpath(`//input[@name='formComidaFavorita' and @value=${this.usuario.comida}]`).click()
            cy.xpath('//select[@id="formEscolaridade"]').select(this.usuario.escolaridade)
            cy.xpath("//select[@id='formEsportes']").select(this.usuario.esportes)
            cy.xpath("//input[@id='formCadastrar']").click()
            cy.xpath("//span[contains(text(),'Cadastrado!')]")
                .should('have.text', 'Cadastrado!')  

        })
          
        
         // cy.get('[data-testid=dataEsportes]').select(['futebol', 'natacao', 'Corrida' ])
        
    })   

})