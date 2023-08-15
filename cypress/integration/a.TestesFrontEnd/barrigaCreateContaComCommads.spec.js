/// <reference types="cypress" />

import loc from "../../support/locators"
import "../../support/commandsConta"

describe('Alerts....', () => {

    //*********  PROCESSO USANDO SUPPORT COMMAND: ***********
    

    before(() => {
      cy.login('vinivioti@yahoo.com.br', 'Cypress@123')
    //  cy.resetApp()
    })    

    it('Criar Conta', () => {
      
    cy.acessarMenuConta() //ações dentro da commandsConta.js em support
    cy.inserirConta('Primeira Conta Vioti') //ações dentro da commandsConta.js em support
    cy.get(loc.MESSAGE.GET_MESSAGE).should('have.text', 'Conta inserida com sucesso!')
    cy.wait(1000)
    cy.get(loc.MESSAGE.CLOSE_MESSAGE).click()

   })  

   it('Não deve Criar Conta Duplicada', () => {
      
    cy.acessarMenuConta() //ações dentro da commandsConta.js em support
    cy.inserirConta('Primeira Conta Vioti') //ações dentro da commandsConta.js em support
    cy.get(loc.MESSAGE.GET_MESSAGE).should('contain', 'code 400')
    cy.wait(1000)
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
     
     // RESET FOI PARA LOCATORS E COMMANDS.JS 

    it('Resetar Massa no site Conta', () => {
    cy.get('.dropdown-toggle').click() 
    cy.get('[href="/reset"]').click()
    cy.wait(1000)
    cy.get(loc.MESSAGE.GET_MESSAGE).should('have.text', 'Dados resetados com sucesso!')
    cy.wait(1000)
    cy.get(loc.MESSAGE.CLOSE_MESSAGE).click()
 
                  
     })

    
})