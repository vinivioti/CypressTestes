/// <reference types="cypress" />



describe('Work whity basic elements', () => {
    
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })    
    
    beforeEach(() => {
        cy.reload()
    })
    
    it('Deve preencher campo no iFrame', () => {
       
    
        cy.get('#frame1').then(iFrame => {
           const body = iFrame.contents().find('body')
           cy.wrap(body).find('#tfield')
            .type('funciona?')
            .should('have.value', 'funciona?')
        })
    })

    it.only('Diretamente no iFrame', () => {
       
        cy.visit('https://wcaquino.me/cypress/frame.html')
        cy.get('#otherButton').click()
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!')
        })
    })
})    