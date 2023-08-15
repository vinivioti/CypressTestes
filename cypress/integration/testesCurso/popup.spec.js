describe('Work whity basic elements', () => {
    
    it('Teste de Popup diretamente', () => {
       
        cy.visit('https://wcaquino.me/cypress/frame.html')
        cy.get('#otherButton').click()
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!')
        })
    })

    it.only('Verificar invocação popup', () => {
       
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.window().then(win => {
            cy.stub(win, 'open').as('winOpen')
        })
        cy.get('#buttonPopUp').click()
        cy.get('@winOpen').should('be.called')
        })
    

    describe.only('Verificar popup por links', () => {
        before(() => {
            cy.visit('https://wcaquino.me/cypress/componentes.html')
        })
        it('checando popup url', () => {
            cy.contains('Popup2')
                .should('have.prop', 'href')
                .and('equal', 'https://wcaquino.me/cypress/frame.html')

        })
      
    })   
    
})