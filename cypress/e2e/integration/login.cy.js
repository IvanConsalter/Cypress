/// <reference types="cypress" />

describe('Curso Cypress', () => {

  it('deve fazer login', () => {
    cy.visit(Cypress.env('baseUrl'));
    cy.get('[data-test="email"]').type(Cypress.env('login'));
    cy.get('[data-test="passwd"]').type(Cypress.env('password'));
    cy.get('.btn').click();
    cy.get('.toast-message').should('contain', 'Bem vindo');
  });
});