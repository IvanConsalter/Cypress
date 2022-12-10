/// <reference types="cypress" />

describe('Teste Api Rest', () => {

  let token;

  before( () => {
    cy.getToken(Cypress.env('login'), Cypress.env('password'))
    .then( tkn => {
      token = tkn;
      cy.resetRest(token);
    })
  });

  it('deve inserir uma conta', () => {
    cy.request({
      url: `${Cypress.env('baseUrlRest')}/contas`,
      method: 'POST',
      headers: {
        Authorization: `JWT ${token}`
      },
      body: {
        nome: 'Conta via rest'
      }
    }).as('response')

    cy.get('@response').then( res => {
      expect(res.status).to.be.equal(201)
      expect(res.body).to.have.property('id')
      expect(res.body).to.have.property('nome', 'Conta via rest')
    })
  });
  
  it('deve editar uma conta', () => {
    cy.getIdConta(token, 'Conta via rest').then( idConta => {
      cy.request({
        method: 'PUT',
        url: `${Cypress.env('baseUrlRest')}/contas/${idConta}`,
        headers: {
          Authorization: `JWT ${token}`
        },
        body: {
          nome: 'Conta alterada via rest'
        }
      }).as('response')
    })

    cy.get('@response').then( res => {
      expect(res.status).to.be.equal(200)
      expect(res.body).to.have.property('id')
      expect(res.body).to.have.property('nome', 'Conta alterada via rest')
    });
  });

  it('não deve criar uma conta já existente', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('baseUrlRest')}/contas`,
      headers: {
        Authorization: `JWT ${token}`
      },
      body: {
        nome: 'Conta alterada via rest'
      },
      failOnStatusCode: false
    }).as('response')

    cy.get('@response').then( res => {
      expect(res.status).to.be.equal(400)
      expect(res.body).to.have.property('error', 'Já existe uma conta com esse nome!')
    });
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