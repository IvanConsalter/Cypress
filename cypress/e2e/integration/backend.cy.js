/// <reference types="cypress" />

const dayjs = require('dayjs')

describe('Teste Api Rest', () => {

  let token;
  const contaRest = 'Conta via rest';
  const contaAlteradaRest = 'Conta alterada via rest';

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
        nome: contaRest
      }
    }).as('response')

    cy.get('@response').then( res => {
      expect(res.status).to.be.equal(201)
      expect(res.body).to.have.property('id')
      expect(res.body).to.have.property('nome', contaRest)
    })
  });
  
  it('deve editar uma conta', () => {
    cy.getIdConta(token, contaRest).then( idConta => {
      cy.request({
        method: 'PUT',
        url: `${Cypress.env('baseUrlRest')}/contas/${idConta}`,
        headers: {
          Authorization: `JWT ${token}`
        },
        body: {
          nome: contaAlteradaRest
        }
      }).as('response')
    })

    cy.get('@response').then( res => {
      expect(res.status).to.be.equal(200)
      expect(res.body).to.have.property('id')
      expect(res.body).to.have.property('nome', contaAlteradaRest)
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
        nome: contaAlteradaRest
      },
      failOnStatusCode: false
    }).as('response')

    cy.get('@response').then( res => {
      expect(res.status).to.be.equal(400)
      expect(res.body).to.have.property('error', 'Já existe uma conta com esse nome!')
    });
  });

  it('deve criar uma movimentação', () => {
    cy.getIdConta(token, contaAlteradaRest).then( idConta => {
      cy.request({
        method: 'POST',
        url: `${Cypress.env('baseUrlRest')}/transacoes`,
        headers: {
          Authorization: `JWT ${token}`
        },
        body: {
          conta_id: idConta,
          data_pagamento: dayjs().add(1, 'day').format('DD/MM/YYYY'),
          data_transacao: dayjs().format('DD/MM/YYYY'),
          descricao: "Desc rest",
          envolvido: "Interessado rest",
          status: true,
          tipo: "REC",
          valor: "123"
        },
      }).as('response')
  
      cy.get('@response').then( res => {
        expect(res.status).to.be.equal(201)
        expect(res.body).to.have.property('id')
        expect(res.body).to.have.property('conta_id', idConta)
      });
    })
  });

  it('deve verificar um valor', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('baseUrlRest')}/saldo`,
      headers: {
        Authorization: `JWT ${token}`
      },
    }).then( resposta => {
      let saldoConta = null;
      resposta.body.forEach( item => {
        if(item.conta === contaAlteradaRest) saldoConta = item.saldo;
      })

      expect(saldoConta).to.equal('123.00');
    });
  });

  it('deve remover uma movimentação', () => {
  });

  it('deve alterar status de uma conta', () => {
  });

  it('deve verificar se saldo da conta alterou', () => {
  });
});