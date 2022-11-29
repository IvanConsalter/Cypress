/// <reference types="cypress" />

import loc from '../../support/locators';

describe('Curso Cypress', () => {

  before( () => {
    cy.login(Cypress.env('login'), Cypress.env('password'));
    cy.resetApp();
  });

  it('deve inserir uma conta', () => {
    cy.get(loc.MENU.BTN_SETTINGS).click();
    cy.get(loc.MENU.ROTA_PARA_CONTA).click();
    cy.get(loc.CONTAS.INPUT_NOME).type('Teste Conta');
    cy.get(loc.CONTAS.BTN_ADD).click();
    cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso');
  });
  
  it('deve editar uma conta', () => {
    cy.get(loc.MENU.BTN_SETTINGS).click();
    cy.get(loc.MENU.ROTA_PARA_CONTA).click();
    cy.xpath(loc.CONTAS.BTN_EDITAR).click();
    cy.get(loc.CONTAS.INPUT_NOME)
      .clear()
      .type('Teste Conta Editar');
    cy.get(loc.CONTAS.BTN_ADD).click();
    cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso');
  });
});