describe('Remover Produto com cupom já aplicado', () => {

    beforeEach(() => {
      cy.fixture('removerProdutoComCupom').as('remover');
    });
  
    Cypress._.times(3, (teste) => {
      it(`Validando remover um produto com cupom já aplicado`, () => {
          cy.get('@remover').then(remover => {
            cy.log(remover.data[teste].titulo)
            cy.visit(Cypress.env("baseUrl"));
            cy.buscarProduto(remover.data[teste].produto1);
            cy.selecionarProduto();
            cy.aplicarQuantidade(remover.data[teste].quantidade)
            cy.buscarProduto(remover.data[teste].produto2);
            cy.selecionarProduto();
            cy.aplicarCupom(remover.data[teste].cupom);
            cy.verificaCupom();
            cy.verificarDesconto(remover.data[teste].cupom);
            cy.removerProduto(remover.data[teste].idProduto);
            cy.verificarDesconto(remover.data[teste].cupom);
          });
      })
    });
  
  })