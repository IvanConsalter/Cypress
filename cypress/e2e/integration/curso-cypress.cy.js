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
    cy.xpath(loc.CONTAS.FN_BTN_EDITAR('Teste Conta')).click();
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
    cy.get(loc.MOVIMENTACAO.CONTA).select('Teste Conta Editar');
    cy.get(loc.MOVIMENTACAO.STATUS).click();
    cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click();

    cy.get(loc.MESSAGE).should('contain', 'sucesso');

    cy.get(loc.EXTRATO.LINHAS).should('have.length', 7);
    cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO(descricao, valor))
      .should('exist');
  });

  it('deve verificar um valor', () => {
    cy.get(loc.MENU.HOME).click();
    cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Teste Conta Editar')).should('contain', '123,00');
  });

  it('deve remover uma movimentação', () => {
    cy.get(loc.MENU.BTN_EXTRATO).click();
    cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Teste Conta Editar')).click();
    cy.get(loc.MESSAGE).should('contain', 'sucesso');
  });

  it('deve alterar status de uma conta', () => {
    cy.get(loc.MENU.BTN_EXTRATO).click();
    cy.xpath(loc.EXTRATO.FN_XP_ATUALIZAR_ELEMENTO('Movimentacao 1, calculo saldo')).click();

    cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo');
    cy.get(loc.MOVIMENTACAO.BTN_STATUS).click();
    cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click();
    cy.get(loc.MESSAGE).should('contain', 'sucesso');
  });

  it('deve verificar se saldo da conta alterou', () => {
    cy.get(loc.MENU.HOME).click();
    cy.reload();
    cy.login(Cypress.env('login'), Cypress.env('password'));
    cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '4.034,00');
  });
});