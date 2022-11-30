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

  it('deve criar uma movimentação', () => {
    cy.get(loc.MENU.MOVIMENTACAO).click();

    const descricao = 'Descricao';
    const valor = '123';

    cy.get(loc.MOVIMENTACAO.DESCRICAO).type(descricao);
    cy.get(loc.MOVIMENTACAO.VALOR).type(valor);
    cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Interessado');
    cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click();

    cy.get(loc.MESSAGE).should('contain', 'sucesso');

    cy.get('.list-group > li').should('have.length', 7);
    cy.xpath(`//span[contains(., ${descricao})]/following-sibling::small[contains(., ${valor})]`)
      .should('exist');
  });
});