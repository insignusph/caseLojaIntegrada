describe('Remover Cupom Aplicado', () => {

    beforeEach(() => {
      cy.fixture('produtoCompleto').as('completo')
    });
  
    Cypress._.times(4, (teste) => {
      it(`Validando remover um cupom após aplicado`, () => {
        cy.get('@completo').then(completo => {
            cy.log(completo.data[teste].titulo)
            cy.visit(Cypress.env("baseUrl"));
            cy.buscarProduto(completo.data[teste].produto);
            cy.selecionarProduto();
            cy.aplicarQuantidade(completo.data[teste].quantidade)
            cy.aplicarCupom(completo.data[teste].cupom);
            cy.verificaCupom();
            cy.verificarDesconto(completo.data[teste].cupom); 
            cy.removerCupom();
            cy.verificarDesconto(""); 
        });
      })
    });
})