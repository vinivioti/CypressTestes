describe('Alerts....', () => {
    
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })    
    
    beforeEach(() => {
        cy.reload()
    })

   //Só podemos verificar as msg com o cypress.. não dá pra clicar ou fazer outras verificações .... :( 

   it('Alert', () => {

    cy.get('#formNome')
    cy.get('table#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3)>input').click()
    cy.get('[onclick*="Francisco"]')
    cy.get('[onclick*=\'Francisco\']')
    cy.get('#tabelaUsuarios td:contains("Doutorado"):eq(0)')
    cy.get('#tabelaUsuarios td:contains("Doutorado"):eq(0) ~ td:eq(3) > input')
    cy.get('#tabelaUsuarios tr:contains("Doutorado"):eq(0) td:eq(6) > input')

    cy.xpath('//input[@name="formNome"]').type('Foi por xpath')
       
    })

    it.only('Usando XPath', () => {

      //  Para usar o xpath:
      //  instale o pacote com o comando:  npm install cypress-xpath
      //  inclua no projeto na pasta support-> index.js a anotação:  require("cypress-xpath") -> Salve o projeto e use à vontade

   
        cy.xpath('//input[@name="formNome"]').type('Foi por xpath')
            .should('have.value', 'Foi por xpath')
           
        })
    

   }) 

