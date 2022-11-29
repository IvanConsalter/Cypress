import loc from './locators';

Cypress.Commands.add('acessarMenuConta', () => {
  cy.get(loc.MENU.BTN_SETTINGS).click();
  cy.get(loc.MENU.ROTA_PARA_CONTA).click();
});

Cypress.Commands.add('inserirConta', (conta) => {
  cy.get(loc.CONTAS.INPUT_NOME).type(conta);
  cy.get(loc.CONTAS.BTN_ADD).click();
});

