/// <reference types="cypress" />
//import '.support/commands'

describe("1. Testes Backend", () => {
//  let token;

  before(() => {
    cy.getToken("testelino@teste.com", "Cypress@123")
//      .then((tkn) => {
//      token = tkn;
//    });
  });

  beforeEach(() => {
    cy.resetRest();
  });

  it("Criar Conta", () => {
    cy.request({
      url: "/contas",
      method: "POST",
//      headers: { Authorization: `JWT ${token}` },
      body: {
        nome: "Conta Via Rest",
      },
    }).as("response");
    //.then(res => console.log(res))

    cy.get("@response").then((res) => {
      expect(res.status).to.be.equal(201);
      expect(res.body).to.have.property("id");
      expect(res.body).to.have.property("nome", "Conta Via Rest");
    });
  });

  it("Alterar Conta", () => {
    cy.getContaByName('Conta para alterar')
      .then(contaId => {
      cy.request({
        url: `/contas/${contaId}`,
        method: "PUT",
//        headers: { Authorization: `JWT ${token}` },
        body: {
          nome: "Alterada Via Rest",
        },
      }).as("response");
    });
    cy.get("@response").then((res) => {
      expect(res.status).to.be.equal(200);
      expect(res.body).to.have.property("id");
      expect(res.body).to.have.property("nome", "Alterada Via Rest");
    });
  });

  it("Não deve inserir conta com mesmo nome", () => {
    cy.request({
      url: "/contas",
      method: "POST",
//      headers: { Authorization: `JWT ${token}` },
      body: {
        nome: "Conta mesmo nome",
      }, failOnStatusCode: false
    }).as("response");

    cy.get("@response").then((res) => {
      expect(res.status).to.be.equal(400);
      expect(res.body.error).to.be.equal("Já existe uma conta com esse nome!")
      expect(res.body).to.have.property("error", "Já existe uma conta com esse nome!");
    });
  });

  it("Inserir Movimentacao", () => {
    cy.getContaByName('Conta para movimentacoes')
    .then(contaId => {
        cy.request({
            url: "/transacoes",
            method: "POST",
//            headers: { Authorization: `JWT ${token}` },
            body: {
              conta_id: contaId,
              data_pagamento: Cypress.moment().add({days: 5}).format('DD/MM/YYYY'),
              data_transacao: Cypress.moment().add({days: -4}).format('DD/MM/YYYY'),
              descricao: "Insercao via Rest",
              envolvido: "Eu sou interessado",
              status: true,
              tipo: "REC",
              valor: "230000"
            }, failOnStatusCode: true
          })
        
    })
 .as("response");

    cy.get("@response").then((res) => {
      expect(res.status).to.be.equal(201);
      expect(res.body).to.have.property("descricao", "Insercao via Rest");
    });
  });


  it("Deve pegar Saldo", () => {
    cy.request({
        url: '/saldo',
        method: 'GET',
//        headers: { Authorization: `JWT ${token}` },
    }).then(res => {
        let saldoConta = null
        res.body.forEach(c => {
            if(c.conta === 'Conta para saldo') saldoConta = c.saldo
        })
        expect(saldoConta).to.be.equal('534.00')
    })
    cy.request({
        url: '/transacoes',
        method: 'GET',
//        headers: { Authorization: `JWT ${token}` },
        qs: {
            descricao: 'Movimentacao 1, calculo saldo'
            }
        }).then(res => {
//            console.log(res.body[0])
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'PUT',
//                headers: { Authorization: `JWT ${token}` },
                body: {
                    status: true,
                    data_transacao: Cypress.moment(res.body[0].data_transacao).format('DD/MM/YYYY'),
                    data_pagamento: Cypress.moment(res.body[0].data_pagamento).format('DD/MM/YYYY'),
                    descricao: res.body[0].descricao,
                    envolvido: res.body[0].envolvido,
                    valor: res.body[0].valor,
                    conta_id: res.body[0].conta_id
                    }
                }).its('status').should('be.equal', 200)
        
            })
    cy.request({
        url: '/saldo',
        method: 'GET',
//        headers: { Authorization: `JWT ${token}` },
    }).then(res => {
         let saldoConta = null
         res.body.forEach(c => {
          if(c.conta === 'Conta para saldo') saldoConta = c.saldo
        })
        expect(saldoConta).to.be.equal('4034.00')
            })       

        })


   it("Remover Movimentação", () => {

    cy.request({
        url: '/transacoes',
        method: 'GET',
//        headers: { Authorization: `JWT ${token}` },
        qs: {
            descricao: 'Movimentacao para exclusao'
            }
        }).then(res => {
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'DELETE',
//                headers: { Authorization: `JWT ${token}` },

            }).its('status').should('be.equal', 204)

        })
    })
})
