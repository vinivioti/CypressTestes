const locators = {
    LOGIN:{
        USER: '[data-test=email]' ,
        XP_USER: "//input[@data-test='email']",
        PASSWORD: '[data-test=passwd]' ,
        BTN_LOGIN: '.btn'
    },

    MENU: {
        HOME: '[data-test=menu-home]',
        SETTINGS: '.dropdown-toggle',
        CONTAS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        MOVIMENTACAO: '[data-test=menu-movimentacao]',
        EXTRATO: ':nth-child(3) > .nav-link'
    },
    
    CONTAS: {
        NOME: '.form-control' , 
        BTN_SALVAR: '.btn'
        
        
    },

    MOVIMENTACAO: {
        DESCRICAO: '[data-test=descricao]',
        VALOR: '[data-test=valor]',
        INTERESSADO: '[data-test=envolvido]',
        STATUS:'[data-test=status]',
        BTN_SALVAR: '.btn-primary'
    },

    EXTRATO: {
        LINHAS: '.list-group > li',
        XP_BUSCA_ELEMENTO: "//span[contains(., 'DESC')]/following-sibling::small[contains(., '10.003')]",
        XP_BUSCA_SALDO: "//td[contains(text(),'Conta Vioti Alterada')]",
        FN_XP_LINHA: desc => `//span[contains(., '${desc}')]/../../../..`

    },
    
    SALDO: {
        FN_XP_SALDO_CONTA: nome => `//td[contains(.,"${nome}")]/../td[2]`
        
    },

    MESSAGE: {
        GET_MESSAGE: '.toast-message' ,
        CLOSE_MESSAGE: '.toast-close-button'

}
    
}

export default locators;

//td[contains()]