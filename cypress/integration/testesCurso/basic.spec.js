/// <reference types="cypress" />

describe('Cypress basics', () => {
    it('Should visit a page and assert title', () => {
     //   cy.visit('www.google.com')
     cy.visit('https://wcaquino.me/cypress/componentes.html')

    
        cy.title().should('be.equal', 'Campo de Treinamento')
        cy.title().should('contain', 'Campo')

        let syncTitle
        
        //** OUTRA FORMA DE FAZER */
        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .and('contain', 'Campo')

        cy.title().then(title => {
            console.log(title)

            cy.get('#formNome').type(title)

            syncTitle = title
        })

        cy.get('[data-cy=dataSobrenome]').then($el => {
            $el.val(syncTitle)

        })

        cy.get('#elementosForm\\:sugestoes').then($el => {
            cy.wrap($el).type(syncTitle)

        })

    })

    it('Should find e interact with an element', () => {
     //   cy.visit('https://wcaquino.me/cypress/componentes.html')

        cy.get('#buttonSimple')
        .click()
        .should('have.value','Obrigado!')


    })
})