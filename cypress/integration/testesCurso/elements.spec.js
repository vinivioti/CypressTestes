/// <reference types="cypress" />



describe('Work whity basic elements', () => {
    
before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
})    

beforeEach(() => {
    cy.reload()
})

it('Text', () => {
   

    cy.get('body').should('contain','Cuidado')
    cy.get('span').should('contain','Cuidado')
    cy.get('.facilAchar').should('have.text','Cuidado onde clica, muitas armadilhas...')

})

it('Links', () => {
   
   // cy.get('a'[1]).click() -> mudou do curso.. kkk 
    cy.get('[href="#"]').click()
    cy.get('#resultado').should('have.text','Voltou!')

    cy.reload()
    cy.contains('Voltar').click()
    cy.get('#resultado').should('have.text','Voltou!')
    
})

it('TextFields', () => {
    cy.get('input#formNome')
    .type('viotis teste')
    .should('have.value','viotis teste')

    cy.get('[data-cy=dataSobrenome]')
    .type('Sobrenome{backspace}{backspace}{backspace}')
    .should('have.value','Sobren')

    cy.get('#elementosForm\\:sugestoes')
    .clear()
    .type('Muito feliz em aprender Cypress, éh nóis!!',{delay: 100})
    .should('have.value','Muito feliz em aprender Cypress, éh nóis!!')

    cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
    .type('Campo1')
    .should('have.value','Campo1')

    cy.get(':nth-child(2) > :nth-child(6) > input')
    .type('Campo2')
    .should('have.value','Campo2')

    cy.get(':nth-child(3) > :nth-child(6) > input')
    .type('Campo3')
    .should('have.value','Campo3')

    cy.get(':nth-child(4) > :nth-child(6) > input')
    .type('Campo4')
    .should('have.value','Campo4')

    cy.get(':nth-child(5) > :nth-child(6) > input')
    .type('Campo5')
    .should('have.value','Campo5')

})
 
it('RadioButtons', () => {
    cy.get('#formSexoFem')
    .click()
    .should('be.checked')
    cy.get('#formSexoMasc')
    .should('not.be.checked')

    cy.get("[name='formSexo']").should('have.length', 2)

})

it('Checkbox', () => {
    cy.get('#formComidaPizza')
    .click()
    .should('be.checked')
    cy.get('#formComidaCarne')
    .should('not.be.checked')

    cy.get("[name='formComidaFavorita']").should('have.length', 4)

    cy.reload()
    cy.get("[name='formComidaFavorita']").click({multiple:true})
    cy.get("[name='formComidaFavorita']").should('be.checked')

})

it('Combo Selecionável', () => {
    //Selecionando pelo nome visual da tela
    cy.get('[data-test=dataEscolaridade]')
    .select('2o grau completo')
    .should('have.value','2graucomp')

    //Selecionando por Value:
    cy.reload()
    cy.get('[data-test=dataEscolaridade]')
    .select('1graucomp')
    .should('have.value','1graucomp')
  
    cy.get('[data-test=dataEscolaridade] option')
        .should('have.length', 8)
    cy.get('[data-test=dataEscolaridade] option').then($arr => {
        const values = []
        $arr.each(function() {
            values.push(this.innerHTML)
        })
        expect(values).to.include.members(["Superior", "Mestrado"])
    })    

})

it.only('Combo Multiplo', () => {
   
   //Selecionando por Value:
    cy.get('[data-testid=dataEsportes]')
         .select(['futebol', 'natacao', 'Corrida' ])
   // cy.get('[data-testid=dataEsportes]')
      //  .should('have.members',"['futebol', 'natacao', 'Corrida' ]") -> NÂO FUNCIONA 

      cy.get('[data-testid=dataEsportes]').then($el => {
         expect($el.val()).to.be.deep.equal(['natacao','futebol','Corrida' ])
         expect($el.val()).to.have.length(3)
      })  

      cy.get('[data-testid=dataEsportes]').invoke('val').should('eql', ['natacao','futebol','Corrida' ] )
  
   
})

})