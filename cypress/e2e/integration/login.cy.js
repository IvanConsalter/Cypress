/// <reference types="cypress" />

import '../../support/commandsConta';
import loc from '../../support/locators';

describe('Curso Cypress', () => {

  before( () => {
    cy.login(Cypress.env('login'), Cypress.env('password'));
    cy.resetApp();
  });

  it('deve inserir uma conta', () => {
    cy.acessarMenuConta();
    cy.inserirConta('Teste Conta');
    cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso');
  });
  
  it('deve editar uma conta', () => {
    cy.acessarMenuConta();
    cy.xpath(loc.CONTAS.BTN_EDITAR).click();
    cy.get(loc.CONTAS.INPUT_NOME)
      .clear()
      .type('Teste Conta Editar');
    cy.get(loc.CONTAS.BTN_ADD).click();
    cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso');
  });

  it('não deve criar uma conta já existente', () => {
    cy.acessarMenuConta();
    cy.get(loc.CONTAS.INPUT_NOME)
      .clear()
      .type('Teste Conta Editar');
    cy.get(loc.CONTAS.BTN_ADD).click();
    cy.get(loc.MESSAGE).should('contain', 'code 400');
  });
});