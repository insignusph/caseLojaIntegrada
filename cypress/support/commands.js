// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('buscarProduto', (produto) => {
    cy.get('#auto-complete').type(produto);
    cy.get('#form-buscar .botao-busca').click();
})

Cypress.Commands.add('selecionarProduto', () => {
    cy.get('.produto-sobrepor').first().click();
    cy.get('.comprar .principal').first().click();
})

Cypress.Commands.add('aplicarCupom', (cupom) => {
    cy.get('#usarCupom').type(cupom);
    cy.get('#btn-cupom').click();
})

Cypress.Commands.add('aplicarQuantidade', (quantidade) => {
    cy.get('.input-mini').clear().type(quantidade)
    cy.get('.atualizar-quantidade').click()
})

Cypress.Commands.add('removerProduto', (idProduto) => {
    cy.get('[data-produto-id=' +idProduto +'] .excluir').click()
    cy.get("[data-type='success']").should("contain", "Produto removido no carrinho.")
})

Cypress.Commands.add('validaCupomInvalido', () => {
    cy.get("[data-type='danger']").contains(" Cupom não encontrado.")
});

Cypress.Commands.add('removerCupom', () => {
    cy.get('.cupom-sucesso .remover-cupom').click();
})
 
Cypress.Commands.add('verificaCupom', () => {
    cy.get('.cupom-codigo').should('be.visible')
});

Cypress.Commands.add('verificarDesconto', (cupom) => {
    let cupomCorreto = cupom.toUpperCase();
    
    cy.get('.subtotal .titulo.cor-principal').invoke('attr', 'data-subtotal-valor').as('subtotal')
    cy.get('.total .valor-total').invoke('attr', 'data-total-valor').as('total')
    cy.get('@subtotal').then(($subtotal, ) => {
      cy.get('@total').then(($total) => {
        let valorFinal
        console.log(`Esse é o cupom, dentro do calculo`, cupomCorreto)
        switch(cupomCorreto) {
            case '10OFF': valorFinal = $subtotal * 0.9;
            expect(parseFloat($total)).to.be.eq(parseFloat(valorFinal))
            cy.contains(cupomCorreto).should('be.visible')
            break;
            case '30REAIS': valorFinal = $subtotal - 30;
            expect(parseFloat($total)).to.be.eq(parseFloat(valorFinal))
            cy.contains(cupomCorreto).should('be.visible')
            break;
            case 'AJJFLWBHH': valorFinal = $subtotal * 0.95;
            expect(parseFloat($total)).to.be.eq(parseFloat(valorFinal))
            cy.contains(cupomCorreto).should('be.visible')
            break;
            case 'FRETEGRATIS': valorFinal = $subtotal * 1;
            expect(parseFloat($total)).to.be.eq(parseFloat(valorFinal))
            cy.contains(cupomCorreto).should('be.visible')
            default:  valorFinal = $subtotal * 1;
            expect(parseFloat($total)).to.be.eq(parseFloat(valorFinal))
        }      
      })
    })
  })