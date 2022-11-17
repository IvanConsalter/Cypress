/// <reference types="cypress" />

describe('Curso Cypress', () => {

  before( () => {
    cy.visit(Cypress.env('baseUrl'));
    cy.get('[data-test="email"]').type(Cypress.env('login'));
    cy.get('[data-test="passwd"]').type(Cypress.env('password'));
    cy.get('.btn').click();
    cy.get('.toast-message').should('contain', 'Bem vindo');
  });

  it('deve inserir uma conta', () => {
    cy.get('[data-test="menu-settings"]').click();
    cy.get('[href="/contas"]').click();
    cy.get('[data-test="nome"]').type('Teste Conta');
    cy.get('.btn').click();
    cy.get('.toast-message').should('contain', 'Conta inserida com sucesso');
  });
  
  it('deve editar uma conta', () => {
    cy.get('[data-test="menu-settings"]').click();
    cy.get('[href="/contas"]').click();
    cy.xpath("//table//td[contains(., 'Teste Conta')]/..//i[@class='far fa-edit']").click();
    cy.get('[data-test="nome"]')
      .clear()
      .type('Teste Conta Editar');
    cy.get('.btn').click();
    cy.get('.toast-message').should('contain', 'Conta atualizada com sucesso');
  });
});