/// <reference types="cypress" />

import loc from "../../support/locators"

describe('Manipular Contas', () => {

    before(() => {
      cy.login('testelino@teste.com', 'Cypress@123')
    //  cy.resetApp()
    })    

it('Criar Conta', () => {
      
    cy.get('.dropdown-toggle > .fas').click()
    cy.xpath("//div[@class='dropdown-menu bg-dark show']//a[@class='nav-link dropdown-item' and text()='Contas']").click()
    cy.xpath("//input[@data-test['nome']]").type('Primeira Conta Vioti')
    cy.xpath("//i[@title='Salvar']").click()
    cy.get(loc.MESSAGE.GET_MESSAGE).should('have.text', 'Conta inserida com sucesso!')
    cy.wait(1000)
    cy.get('.toast-close-button').click()
    cy.get(loc.MESSAGE.CLOSE_MESSAGE).click()

   })  

    it('Alterar Conta', () => {
      

    cy.get(':nth-child(1) > :nth-child(2) > :nth-child(1) > .far').click()
    cy.get('.form-control')
    .clear()
    .type('Conta Vioti Alterada')
    cy.get('.btn > .far').click()
    cy.wait(2000)
    cy.get(loc.MESSAGE.GET_MESSAGE).should('have.text', 'Conta atualizada com sucesso!')
    cy.wait(1000)
    cy.get(loc.MESSAGE.CLOSE_MESSAGE).click()

                  
     })

    it('Resetar Massa no site Conta', () => {
     cy.get('.dropdown-toggle').click() 
     cy.get('[href="/reset"]').click()
     cy.wait(1000)
     cy.get(loc.MESSAGE.CLOSE_MESSAGE).click()
 
                  
     })

  
})
