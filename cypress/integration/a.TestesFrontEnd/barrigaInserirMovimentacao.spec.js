/// <reference types="cypress" />

import loc from "../../support/locators";
import "../../support/commandsConta";
import "../../support/commands";
import buildEnvironment from "../../support/buildEnvironment";

describe("Alerts....", () => {
  //*********  PROCESSO USANDO SUPPORT COMMAND: ***********

  before(() => {
    cy.login("testelino@teste.com", "Cypress@123");
    //  cy.resetAppli()
  });

  it("Criar Conta", () => {
    cy.acessarMenuConta(); //ações dentro da commandsConta.js em support
    cy.inserirConta("Primeira Conta Vioti"); //ações dentro da commandsConta.js em support
    cy.get(loc.MESSAGE.GET_MESSAGE).should(
      "have.text",
      "Conta inserida com sucesso!"
    );
    cy.get(loc.MESSAGE.CLOSE_MESSAGE).click();
  });

  it("Não deve Criar Conta Duplicada", () => {
    cy.acessarMenuConta(); //ações dentro da commandsConta.js em support
    cy.inserirConta("Primeira Conta Vioti"); //ações dentro da commandsConta.js em support
    cy.get(loc.MESSAGE.GET_MESSAGE).should("contain", "code 400");
    cy.get(loc.MESSAGE.CLOSE_MESSAGE).click();
  });

  it("Alterar Conta", () => {
    cy.get(":nth-child(1) > :nth-child(2) > :nth-child(1) > .far").click();
    cy.get(".form-control").clear().type("Conta Vioti Alterada");
    cy.get(".btn > .far").click();
    cy.get(loc.MESSAGE.GET_MESSAGE).should(
      "have.text",
      "Conta atualizada com sucesso!"
    );
    cy.get(loc.MESSAGE.CLOSE_MESSAGE).click();
  });

  it("Inserir Movimentacao", () => {
    cy.get(loc.MENU.MOVIMENTACAO).click();

    cy.get(loc.MOVIMENTACAO.DESCRICAO).type("DESCRIÇAO UM");
    cy.get(loc.MOVIMENTACAO.INTERESSADO).type("INTERESSADO");
    cy.get(loc.MOVIMENTACAO.VALOR).type("10003");
    cy.get(loc.MOVIMENTACAO.STATUS).click();
    cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click();
    cy.get(loc.MESSAGE.GET_MESSAGE).should(
      "have.text",
      "Movimentação inserida com sucesso!"
    );
    cy.get(loc.MESSAGE.CLOSE_MESSAGE).click();

    cy.get(loc.EXTRATO.LINHAS).should("have.length", 7);
    //  cy.xpath(loc.EXTRATO.XP_BUSCA_ELEMENTO).should('exist')
  });

  // RESET FOI PARA LOCATORS E COMMANDS.JS

  it("Resetar Massa no site Conta", () => {
    cy.get(".dropdown-toggle").click();
    cy.get('[href="/reset"]').click();
    cy.wait(1000);
    cy.get(loc.MESSAGE.GET_MESSAGE).should(
      "have.text",
      "Dados resetados com sucesso!"
    );
    cy.wait(1000);
    cy.get(loc.MESSAGE.CLOSE_MESSAGE).click();
  });

  it("Deve testar as cores da tela de extrato", () => {
    buildEnvironment();
    cy.route({
      method: "GET",
      url: "/extrato/**",
      response: [
        {
          conta: "Conta para movimentacoes",
          id: 1738651,
          descricao: "Receita Paga",
          envolvido: "AAA",
          observacao: null,
          tipo: "REC",
          data_transacao: "2023-08-15T03:00:00.000Z",
          data_pagamento: "2023-08-15T03:00:00.000Z",
          valor: "-1500.00",
          status: true,
          conta_id: 1855704,
          usuario_id: 39959,
          transferencia_id: null,
          parcelamento_id: null,
        },
        {
          conta: "Conta com movimentacao",
          id: 1738652,
          descricao: "Receita Pendente",
          envolvido: "BBB",
          observacao: null,
          tipo: "REC",
          data_transacao: "2023-08-15T03:00:00.000Z",
          data_pagamento: "2023-08-15T03:00:00.000Z",
          valor: "-1500.00",
          status: false,
          conta_id: 1855705,
          usuario_id: 39959,
          transferencia_id: null,
          parcelamento_id: null,
        },
        {
          conta: "Conta para saldo",
          id: 1738653,
          descricao: "Despesa Paga",
          envolvido: "CCC",
          observacao: null,
          tipo: "DESP",
          data_transacao: "2023-08-15T03:00:00.000Z",
          data_pagamento: "2023-08-15T03:00:00.000Z",
          valor: "3500.00",
          status: true,
          conta_id: 1855706,
          usuario_id: 39959,
          transferencia_id: null,
          parcelamento_id: null,
        },
        {
          conta: "Conta para saldo",
          id: 1738654,
          descricao: "Despesa Pendente",
          envolvido: "DDD",
          observacao: null,
          tipo: "DESP",
          data_transacao: "2023-08-15T03:00:00.000Z",
          data_pagamento: "2023-08-15T03:00:00.000Z",
          valor: "-1000.00",
          status: false,
          conta_id: 1855706,
          usuario_id: 39959,
          transferencia_id: null,
          parcelamento_id: null,
        },
      ],
    });

    cy.get(loc.MENU.EXTRATO).click();
    cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receita Paga')).should('have.class','receitaPaga')
    cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receita Pendente')).should('have.class','receitaPendente')
    cy.xpath(loc.EXTRATO.FN_XP_LINHA('Despesa Paga')).should('have.class','despesaPaga')
    cy.xpath(loc.EXTRATO.FN_XP_LINHA('Despesa Pendente')).should('have.class','despesaPendente')

  });

  it("Deve testar responsividade", () => {
    cy.get('[data-test=menu-home]').should('exist')
      .and('be.visible')
      cy.viewport(500,700)  
      cy.get('[data-test=menu-home]').should('exist')
        .and('be.not.visible')

  });

  it("Deve testar responsividade Iphone", () => {
    cy.get('[data-test=menu-home]').should('exist')
      .and('be.visible')
      cy.viewport("iphone-6")  

  });

  it("Deve testar responsividade IPad", () => {
    cy.get('[data-test=menu-home]').should('exist')
      .and('be.visible')
      cy.viewport("ipad-2")  


  });



})
