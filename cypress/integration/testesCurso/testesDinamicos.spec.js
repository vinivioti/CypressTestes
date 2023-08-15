/// <reference types="cypress" />



describe('Alerts....', () => {
    
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })    
    
    beforeEach(() => {
        cy.reload()
    })

    const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano']
    foods.forEach(food => {
    
        it(`Cadastro com comida ${food}`, () => {

    cy.xpath('//input[@name="formNome"]').type('Foi por xpath')
    cy.xpath('//input[@name="formSobrenome"]').type('OPAAAAA')
    cy.xpath('//input[@id="formSexoMasc"]').click()
    cy.xpath(`//label[contains(., '${food}')]/preceding-sibling::input`).click()
    cy.xpath('//select[@id="formEscolaridade"]').select('Superior')
    cy.xpath("//select[@id='formEsportes']").select(['natacao','Karate'])
    cy.xpath("//input[@id='formCadastrar']").click()
    cy.xpath("//span[contains(text(),'Cadastrado!')]")
       .should('have.text', 'Cadastrado!')  

       })
   })
  
})