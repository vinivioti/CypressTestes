// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import loc from "./locators";

Cypress.Commands.add("clickAlerta", (locator, message) => {
  cy.get(locator).click();
  cy.on("window:alert", (msg) => {
    expect(msg).to.be.equal(message);
  });
});

Cypress.Commands.add("login", (XP_USER, PASSWORD) => {
  cy.visit("http://barrigareact.wcaquino.me/");
  //   cy.get(loc.LOGIN.USER).type('vinivioti@yahoo.com.br')
  cy.xpath(loc.LOGIN.XP_USER).type(XP_USER);
  cy.get(loc.LOGIN.PASSWORD).type(PASSWORD);
  cy.get(loc.LOGIN.BTN_LOGIN).click();
  cy.get(loc.MESSAGE.GET_MESSAGE).should("have.text", "Bem vindo, Vinissius!");
  cy.get(".toast-close-button").click();
})

Cypress.Commands.add("resetAppli", () => {
  cy.get(loc.MENU.SETTINGS).click();
  cy.get(loc.MENU.RESET).click();
})

Cypress.Commands.add("getToken", (user, passwd) => {
  cy.request({
    method: "POST",
    url: "/signin",
    body: {
      email: user,
      redirecionar: false,
      senha: passwd,
    },
  })
    .its("body.token")
    .should("not.be.empty")
    .then((token) => {
       Cypress.env('token', token) 
      return token;
    })
})

Cypress.Commands.add("resetRest", () => {
  cy.getToken("testelino@teste.com", "Cypress@123").then((token) => {
    cy.request({
      method: "GET",
      url: "/reset",
      headers: { Authorization: `JWT ${token}` },
    })
      .its("status")
      .should("be.equal", 200);
  })
})

Cypress.Commands.add("getContaByName", (name) => {
  cy.getToken("testelino@teste.com", "Cypress@123").then((token) => {
    cy.request({
      url: "/contas",
      method: "GET",
      headers: { Authorization: `JWT ${token}` },
      qs: {
        nome: name,
      },
    }).then(res => {
        return res.body[0].id
    })

  })
})
Cypress.Commands.overwrite('request', (originalFn, ...options)=> {
    if(options.length === 1) {
        if(Cypress.env('token')){
//            console.log(options)
            options[0].headers = {
                Authorization: `JWT ${Cypress.env('token')}`
            }
        }
    }
    return originalFn(...options)
})

// =-=-=-=-=-=-=-=-=-= MÉTODOS FAKER =-=-=-=-=-=-=-=

Cypress.Commands.add("loginFaker", (XP_USER, PASSWORD) => {
  cy.visit("http://barrigareact.wcaquino.me/");
  //   cy.get(loc.LOGIN.USER).type('testelino@teste.com')
  cy.xpath(loc.LOGIN.XP_USER).type(XP_USER);
  cy.get(loc.LOGIN.PASSWORD).type(PASSWORD);
  cy.get(loc.LOGIN.BTN_LOGIN).click();
  cy.get(loc.MESSAGE.GET_MESSAGE).should("have.text", "Bem vindo, usuarioFaker!");
  cy.get(".toast-close-button").click();
})
