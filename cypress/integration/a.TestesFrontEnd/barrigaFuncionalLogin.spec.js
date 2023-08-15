/// <reference types="cypress" />



describe('Alerts....', () => {
    
    before(() => {
        cy.visit('http://barrigareact.wcaquino.me/')
        cy.xpath("//input[@data-test='email']").type('vinivioti@yahoo.com.br')
        cy.xpath("//input[@data-test='passwd']").type('Cypress@123')
        cy.xpath("//button[@type='submit']").click()
        cy.xpath("//div[@class='toast-message']").should('have.text', 'Bem vindo, Vinissius!')
    })    
    
   // beforeEach(() => {
   //     cy.reload()
   // })

    it('efetuarLogOut', () => {
      
        cy.wait(3000)
        cy.get('.dropdown-toggle > .fas').click()
        cy.xpath("//div[@class='dropdown-menu bg-dark show']//a[@class='nav-link dropdown-item' and text()='Sair']").click()
        cy.xpath("//div[@class='toast-message']").should('have.text', 'Até Logo!')
         
                      
     })
     
})