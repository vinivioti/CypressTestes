/// <reference types="cypress" />



describe('Alerts....', () => {
    
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })    
    
    beforeEach(() => {
        cy.reload()
    })

   //Só podemos verificar as msg com o cypress.. não dá pra clicar ou fazer outras verificações .... :( 

   it('Alert', () => {

        cy.get('#alert').click()
        cy.on('window:alert', msg => {
        console.log(msg)
        expect(msg).to.be.equal('Alert Simples')
    })

   }) 

   it('Alert Com Mock', () => {
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        cy.get('#alert').click().then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
    })

}) 

    it('Confirmar Mensagem', () => {
        cy.get('#confirm').click()
        cy.on('window:confirm', msg => {
        expect(msg).to.be.equal('Confirm Simples')
})
        cy.on('window:alert', msg => {
        expect(msg).to.be.equal('Confirmado')

    }) 

}) 

    it('Confirmar Mensagem NEGADO', () => {
        cy.get('#confirm').click()
        cy.on('window:confirm', msg => {
        expect(msg).to.be.equal('Confirm Simples')
        return false
})
    cy.on('window:alert', msg => {
    expect(msg).to.be.equal('Negado')

    }) 

}) 

    it('Prompt', () => {
   
    cy.window().then(win => {
        cy.stub(win, 'prompt').returns('42')
    })
    cy.on('window:confirm', msg => {
        expect(msg).to.be.equal('Era 42?')
    })    
    cy.on('window:alert', msg => {
        expect(msg).to.be.equal(':D')
    })

    cy.get('#prompt').click()

    })

    it('Validando mensagens', () => {
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio'))

        cy.get('#formNome').type('Vinissius')  

        cy.get('#formCadastrar').click()
        .then(() => expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio')) 

        cy.get('[data-cy=dataSobrenome]').type('Vioti') 
        cy.get('#formCadastrar').click()
        .then(() => expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio'))

        cy.get('#formSexoMasc').click()
        cy.get('#formCadastrar').click()

        cy.get('#resultado > :nth-child(1)').should('have.text','Cadastrado!')
        })

    })  

//  NÃO FUNCIONOU
//    it('Command -> Alert', () => {
                     //locator , Msg Equal   
//        cy.clickAlerta('#alert', 'Alert Simples')
  
//   }) 
//  NÃO FUNCIONOU

