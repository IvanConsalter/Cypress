const LOCATORS = {
  LOGIN: {
    EMAIL: '[data-test="email"]', 
    PASSWORD: '[data-test="passwd"]', 
    BTN: '.btn', 
  },
  MENU: {
    BTN_SETTINGS: '[data-test="menu-settings"]',
    ROTA_PARA_CONTA: '[href="/contas"]'
  },
  CONTAS: {
    INPUT_NOME: '[data-test="nome"]',
    BTN_ADD: '.btn',
    BTN_EDITAR: "//table//td[contains(., 'Teste Conta')]/..//i[@class='far fa-edit']",
    BTN_RESETAR: "[href='/reset']",
  },
  MESSAGE: '.toast-message'
}

export default LOCATORS;