describe('Aplicar Cupom com sucesso', () => {

  beforeEach(() => {
    cy.fixture('produtoCompleto').as('completo');
    cy.fixture('produtoIncompleto').as('incompleto')
  });

  Cypress._.times(4, (teste) => {
    it(`Validando aplicar cupom com Sucesso a um produto já com desconto`, () => {
        cy.get('@completo').then(completo => {
          cy.log(completo.data[teste].titulo)
          cy.visit(Cypress.env("baseUrl"));
          cy.buscarProduto(completo.data[teste].produto);
          cy.selecionarProduto();
          cy.aplicarQuantidade(completo.data[teste].quantidade)
          cy.aplicarCupom(completo.data[teste].cupom);
          cy.verificaCupom();
          cy.verificarDesconto(completo.data[teste].cupom); 
        });
    })
  });

  Cypress._.times(3, (teste) => {
    it(`Validando aplicar cupom com Sucesso a um produto sem desconto e sem imagem`, () => {
        cy.get('@incompleto').then(incompleto => {
          cy.log(incompleto.data[teste].titulo)
          cy.visit(Cypress.env("baseUrl"));
          cy.buscarProduto(incompleto.data[teste].produto);
          cy.selecionarProduto();
          cy.aplicarQuantidade(incompleto.data[teste].quantidade)
          cy.aplicarCupom(incompleto.data[teste].cupom);
          cy.verificaCupom();
          cy.verificarDesconto(incompleto.data[teste].cupom); 
        });
    })
  });

})