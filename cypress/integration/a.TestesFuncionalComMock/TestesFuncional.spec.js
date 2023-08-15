/// <reference types="cypress" />

import loc from "../../support/locators";
import "../../support/commandsConta";
import buildEnvironment from "../../support/buildEnvironment";

describe("Testes Com Mock", () => {
  //*********  PROCESSO USANDO SUPPORT COMMAND: ***********

  after(() => {
    cy.clearLocalStorage();
  });

  beforeEach(() => {
    buildEnvironment();
    cy.loginFaker("vinivioti@yahoo.com.br", "123456789jlkjlkjkl");
    //  cy.resetApp()
  });

  it("Criar Conta", () => {
    cy.route({
      method: "POST",
      url: "/contas",
      response: [
        {
          id: 3,
          nome: "Primeira Conta Vioti",
          visivel: true,
          usuario_id: 39959,
        },
      ],
    });

    cy.acessarMenuConta(); //ações dentro da commandsConta.js em support
    cy.route({
      method: "GET",
      url: "/contas",
      response: [
        {
          id: 1,
          nome: "CARTEIRA",
          visivel: true,
          usuario_id: 39959,
        },
        {
          id: 2,
          nome: "BANCO",
          visivel: true,
          usuario_id: 39959,
        },
        {
          id: 3,
          nome: "Primeira Conta Vioti",
          visivel: true,
          usuario_id: 39959,
        },
      ],
    }).as("contasSalvas");
    cy.inserirConta("Primeira Conta Vioti"); //ações dentro da commandsConta.js em support
    cy.get(loc.MESSAGE.GET_MESSAGE).should(
      "have.text",
      "Conta inserida com sucesso!"
    );
    cy.wait(1000);
    cy.get(loc.MESSAGE.CLOSE_MESSAGE).click();
  });

  it("Alterar Conta", () => {
    cy.route({
      method: "PUT",
      url: "/contas/**", //NESSE MOMENTO SERIA /CONTAS/1 OU /2, COLOCAMOS /** PARA FICAR GENÉRICO E PEGAR QUALQUER VALOR APÓS O /
      response: {
        id: 1,
        nome: "CARTEIRA ALTERADA",
        visivel: true,
        usuario_id: 39959,
      },
    });

    cy.acessarMenuConta();
    cy.get(":nth-child(1) > :nth-child(2) > :nth-child(1) > .far").click();
    cy.get(".form-control").clear().type("CARTEIRA ALTERADA");
    cy.get(".btn > .far").click();
    cy.wait(2000);
    cy.get(loc.MESSAGE.GET_MESSAGE).should(
      "have.text",
      "Conta atualizada com sucesso!"
    );
    cy.wait(1000);
    cy.get(loc.MESSAGE.CLOSE_MESSAGE).click();
  });

  it("Não deve Criar Conta Duplicada", () => {
    cy.route({
      method: "POST",
      url: "/contas",
      status: 400,
      response: [
        {
          error: "Já existe uma conta com esse nome!",
        },
      ],
    }).as("contaMesmoNome");

    cy.acessarMenuConta(); //ações dentro da commandsConta.js em support
    cy.inserirConta("CARTEIRA"); //ações dentro da commandsConta.js em support
    cy.get(loc.MESSAGE.GET_MESSAGE).should("contain", "code 400");
    cy.wait(1000);
    cy.get(loc.MESSAGE.CLOSE_MESSAGE).click();
  });

  it("Inserir Movimentacao", () => {
    cy.route({
      method: "POST",
      url: "/transacoes",
      response: [
        {
          id: 1738660,
          descricao: "DESCRIÇAO UM",
          envolvido: "INTERESADO",
          observacao: null,
          tipo: "REC",
          data_transacao: "2023-08-15T03:00:00.000Z",
          data_pagamento: "2023-08-15T03:00:00.000Z",
          valor: "10003",
          status: true,
          conta_id: 1855704,
          usuario_id: 39959,
          transferencia_id: null,
          parcelamento_id: null,
        },
      ],
    });
    cy.get(loc.MENU.MOVIMENTACAO).click();

    cy.get(loc.MOVIMENTACAO.DESCRICAO).type("DESCRIÇAO UM");
    cy.get(loc.MOVIMENTACAO.VALOR).type("10003");
    cy.get(loc.MOVIMENTACAO.INTERESSADO).type("INTERESSADO");
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

});
