/// <reference types="cypress" />

describe('Teste Api Rest', () => {

  before( () => {
    cy.login(Cypress.env('login'), Cypress.env('password'));
    cy.resetApp();
  });

  it('deve inserir uma conta', () => {
  });
  
  it('deve editar uma conta', () => {
  });

  it('não deve criar uma conta já existente', () => {
  });

  it('deve criar uma movimentação', () => {
  });

  it('deve verificar um valor', () => {
  });

  it('deve remover uma movimentação', () => {
  });

  it('deve alterar status de uma conta', () => {
  });

  it('deve verificar se saldo da conta alterou', () => {
  });
});