const LOCATORS = {
  LOGIN: {
    EMAIL: '[data-test="email"]', 
    PASSWORD: '[data-test="passwd"]', 
    BTN: '.btn', 
  },
  MENU: {
    HOME: '[data-test="menu-home"]',
    BTN_SETTINGS: '[data-test="menu-settings"]',
    ROTA_PARA_CONTA: '[href="/contas"]',
    MOVIMENTACAO: '[data-test=menu-movimentacao]',
    BTN_EXTRATO: '[data-test="menu-extrato"]'
  },
  CONTAS: {
    INPUT_NOME: '[data-test="nome"]',
    BTN_ADD: '.btn',
    FN_BTN_EDITAR: (nome) => `//table//td[contains(., '${nome}')]/..//i[@class='far fa-edit']`,
    BTN_RESETAR: "[href='/reset']",
  },
  MOVIMENTACAO: {
    DESCRICAO: '[data-test=descricao]',
    VALOR: '[data-test=valor]',
    INTERESSADO: '[data-test=envolvido]',
    STATUS: '[data-test=status]',
    CONTA: '[data-test="conta"]',
    BTN_SALVAR: '.btn-primary',
    BTN_STATUS: '[data-test="status"]',
  },
  EXTRATO: {
    LINHAS: '.list-group > li',
    FN_XP_BUSCA_ELEMENTO: 
      (descricao, valor) => 
        `//span[contains(., ${descricao})]/following-sibling::small[contains(., ${valor})]`,
    FN_XP_REMOVER_ELEMENTO: 
      (conta) => 
        `//small[contains(., '${conta}')]/../../..//a//i[@class='far fa-trash-alt']`,
    FN_XP_ATUALIZAR_ELEMENTO: 
      (conta) => 
        `//span[contains(., '${conta}')]/../../..//a//i[@class='fas fa-edit']`
  },
  SALDO: {
    FN_XP_SALDO_CONTA: (nome) => `//td[contains(., '${nome}')]/../td[2]`
  },
  MESSAGE: '.toast-message'
}

export default LOCATORS;