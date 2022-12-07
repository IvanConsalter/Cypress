/// <reference types="cypress" />

describe('Teste Api Rest', () => {

  before( () => {
    // cy.login(Cypress.env('login'), Cypress.env('password'));
    // cy.resetApp();
  });

  it('deve inserir uma conta', () => {
    cy.request({
      method: 'POST',
      url: 'https://barrigarest.wcaquino.me/signin',
      body: {
        email: Cypress.env('login'),
        redirecionar: false,
        senha: Cypress.env('password')
      }
    })
    .its('body.token').should('not.be.empty')
    .then(token => {
      cy.request({
        url: 'https://barrigarest.wcaquino.me/contas',
        method: 'POST',
        headers: {
          Authorization: `JWT ${token}`
        },
        body: {
          nome: 'Conta via rest'
        }
      }).as('response')
    })

    cy.get('@response').then( res => {
      expect(res.status).to.be.equal(201)
      expect(res.body).to.have.property('id')
      expect(res.body).to.have.property('nome', 'Conta via rest')
    })
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