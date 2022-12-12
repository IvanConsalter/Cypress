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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import loc from './locators';

Cypress.Commands.add('login', (user, password) => {
  cy.visit(Cypress.env('baseUrl'));
  cy.get(loc.LOGIN.EMAIL).type(user);
  cy.get(loc.LOGIN.PASSWORD).type(password);
  cy.get(loc.LOGIN.BTN).click();
  cy.get(loc.MESSAGE).should('contain', 'Bem vindo');
});

Cypress.Commands.add('resetApp', () => {
  cy.get(loc.MENU.BTN_SETTINGS).click();
  cy.get(loc.CONTAS.BTN_RESETAR).click();
});

Cypress.Commands.add('getToken', (user, password) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('baseUrlRest')}/signin`,
    body: {
      email: user,
      redirecionar: false,
      senha: password
    }
  })
  .its('body.token').should('not.be.empty')
  .then( token => token);
});

Cypress.Commands.add('resetRest', (token) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('baseUrlRest')}/reset`,
    headers: { Authorization: `JWT ${token}` }
  })
  .its('status').should('be.equal', 200)
});

Cypress.Commands.add('getIdConta', (token, nome) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('baseUrlRest')}/contas`,
    headers: { Authorization: `JWT ${token}` },
    qs: {
      nome: nome
    }
  })
  .then( res => res.body[0].id)
})

Cypress.Commands.add('getIdMovimentacao', (token, idConta) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('baseUrlRest')}/extrato/202212`,
    headers: { Authorization: `JWT ${token}` },
    qs: {
      conta_id: idConta
    }
  })
  .then( res => {
    let idMovimentacao = null;
    res.body.forEach( item => {
      if(item.conta_id === idConta) idMovimentacao = item.id;
    });

    return idMovimentacao;
  })
})