/// <reference types="cypress" />

it ('A External test...', () => {

})

describe('Grupo de Testes ...', () => {
    describe('Grupo de Testes mais específicos ...', () => {
        it ('A Especific Test ...', () => {

        })
   })

   describe('Grupo de Testes mais específicos ...', () => {
    it ('A Especific Test ...', () => {

    })
})

//Podemos dar um ' Skip ' para que o teste não reconheça ele ex:
// it.skip('A Especific Test ...', () => 

// Ou podemos pedir para rodar somente um teste específico com " only "
// it.only('A Especific Test ...', () => 

// Pode ser feito tano nos testes quanto nos grupos de teste 
//  describe.skip('Grupo de Testes mais específicos ...', () => 
//  describe.only('Grupo de Testes mais específicos ...', () => 

 it('A Especific Test ...', () => {

 })


})