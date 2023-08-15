const buildEnvironment = () => {
  cy.server();
  cy.route({
    method: "POST",
    url: "/signin",
    response: {
      id: 1000,
      nome: "usuarioFaker",
      token: "StringGrandeQueVaiPassarMesmoErrada",
    },
  }).as("signin");

  cy.route({
    method: "GET",
    url: "/saldo",
    response: [
      {
        conta_id: 99,
        conta: "CARTEIRA",
        saldo: "10000.00",
      },
      {
        conta_id: 999,
        conta: "BANCO",
        saldo: "220000000.00",
      },
    ],
  }).as("saldo");

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
    ],
  }).as("contas");

  cy.route({
    method: 'GET',
    url: '/extrato/**',
    response: 
    [
        {
            "conta": "Conta para movimentacoes",
            "id": 1738651,
            "descricao": "Movimentacao para exclusao",
            "envolvido": "AAA",
            "observacao": null,
            "tipo": "DESP",
            "data_transacao": "2023-08-15T03:00:00.000Z",
            "data_pagamento": "2023-08-15T03:00:00.000Z",
            "valor": "-1500.00",
            "status": true,
            "conta_id": 1855704,
            "usuario_id": 39959,
            "transferencia_id": null,
            "parcelamento_id": null
        },
        {
            "conta": "Conta com movimentacao",
            "id": 1738652,
            "descricao": "Movimentacao de conta",
            "envolvido": "BBB",
            "observacao": null,
            "tipo": "DESP",
            "data_transacao": "2023-08-15T03:00:00.000Z",
            "data_pagamento": "2023-08-15T03:00:00.000Z",
            "valor": "-1500.00",
            "status": true,
            "conta_id": 1855705,
            "usuario_id": 39959,
            "transferencia_id": null,
            "parcelamento_id": null
        },
        {
            "conta": "Conta para saldo",
            "id": 1738653,
            "descricao": "Movimentacao 1, calculo saldo",
            "envolvido": "CCC",
            "observacao": null,
            "tipo": "REC",
            "data_transacao": "2023-08-15T03:00:00.000Z",
            "data_pagamento": "2023-08-15T03:00:00.000Z",
            "valor": "3500.00",
            "status": false,
            "conta_id": 1855706,
            "usuario_id": 39959,
            "transferencia_id": null,
            "parcelamento_id": null
        },
        {
            "conta": "Conta para saldo",
            "id": 1738654,
            "descricao": "Movimentacao 2, calculo saldo",
            "envolvido": "DDD",
            "observacao": null,
            "tipo": "DESP",
            "data_transacao": "2023-08-15T03:00:00.000Z",
            "data_pagamento": "2023-08-15T03:00:00.000Z",
            "valor": "-1000.00",
            "status": true,
            "conta_id": 1855706,
            "usuario_id": 39959,
            "transferencia_id": null,
            "parcelamento_id": null
        },
        {
            "conta": "Conta para saldo",
            "id": 1738655,
            "descricao": "Movimentacao 3, calculo saldo",
            "envolvido": "EEE",
            "observacao": null,
            "tipo": "REC",
            "data_transacao": "2023-08-15T03:00:00.000Z",
            "data_pagamento": "2023-08-15T03:00:00.000Z",
            "valor": "1534.00",
            "status": true,
            "conta_id": 1855706,
            "usuario_id": 39959,
            "transferencia_id": null,
            "parcelamento_id": null
        },
        {
            "conta": "Conta para extrato",
            "id": 1738656,
            "descricao": "Movimentacao para extrato",
            "envolvido": "FFF",
            "observacao": null,
            "tipo": "DESP",
            "data_transacao": "2023-08-15T03:00:00.000Z",
            "data_pagamento": "2023-08-15T03:00:00.000Z",
            "valor": "-220.00",
            "status": true,
            "conta_id": 1855707,
            "usuario_id": 39959,
            "transferencia_id": null,
            "parcelamento_id": null
        },
        {
            "conta": "Conta para movimentacoes",
            "id": 1738659,
            "descricao": "asdaffadsf",
            "envolvido": "INTERESADO",
            "observacao": null,
            "tipo": "REC",
            "data_transacao": "2023-08-15T03:00:00.000Z",
            "data_pagamento": "2023-08-15T03:00:00.000Z",
            "valor": "10.00",
            "status": true,
            "conta_id": 1855704,
            "usuario_id": 39959,
            "transferencia_id": null,
            "parcelamento_id": null
        }
    ]
  }).as("extrato")

}

export default buildEnvironment;
