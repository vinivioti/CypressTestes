/// <reference types="cypress" />



describe('Helpers ...', () => {
  //  before(() => {
  //      cy.visit('https://wcaquino.me/cypress/componentes.html')
  //  })    
    
  //  beforeEach(() => {
  //      cy.reload()
  //  })


    it('Wrap', () => {
       
        const obj = {nome: 'User' , idade: '42'}
        expect(obj).to.have.property('nome')
       cy.wrap(obj).should('have.property','nome')

       cy.visit('https://wcaquino.me/cypress/componentes.html')
      // cy.get('#formNome').type('Funciona??')
          
      // cy.get('#formNome').then($el => {
      // cy.wrap($el).type('Funciona via Cypress')
      // })

       const promise = new Promise ((resolve, reject) => {
        setTimeout(() => {
          resolve(10)
        }, 500 )
       })

       cy.get('#buttonSimple').then(() => console.log('Encontrei o Primiero botão'))
      // promise.then(num => console.log(num))
       cy.wrap(promise).then(ret => console.log(ret))
       cy.get('#buttonList').then(() => console.log('Encontrei o Segundo botão'))
    })

    it('Its...Trabalha com as propriedades.', () => {
      const obj = {nome: 'User' , idade: '42'}
      cy.wrap(obj).should('have.property', 'nome', 'User')
      cy.wrap(obj).its('nome').should('be.equal', 'User')

      const obj2 = { nome: 'User', idade: '42', endereco: {rua: 'dos estudos, 666'}}
      cy.wrap(obj2).its('endereco').should('have.property','rua')
      cy.wrap(obj2).its('endereco').its('rua').should('contain','666')
      cy.wrap(obj2).its('endereco.rua').should('contain','666')

      cy.visit('https://wcaquino.me/cypress/componentes.html')
      cy.title().its('length').should('be.equal', 20)

    })

    it.only('Invoke...Trabalha com as funções.', () => {
     const getValue = () => 1
     const soma = (a,b) => a + b

     cy.wrap({ fn: getValue}).invoke('fn').should('be.equal', 1)
     cy.wrap({ fn: soma}).invoke('fn', 2, 5).should('be.equal', 7)

     cy.visit('https://wcaquino.me/cypress/componentes.html')
     cy.get('#formNome').invoke('val', 'Texto via Invoke')
     cy.window().invoke('alert', 'Da par ver???')
     cy.get('#resultado')
          .invoke('html', '<input type="button" value="hached!!"/>')

     

    })

})