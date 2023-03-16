describe('Aplicar Cupom Invalido', () => {

    beforeEach(() => {
      cy.fixture('cupomInvalido').as('invalido')
    });
  
    it(`Validando aplicar um cupom invalido a um produto`, () => {
        cy.get('@invalido').then(invalido => {
            cy.log(invalido.data[0].titulo)
            cy.visit(Cypress.env("baseUrl"));
            cy.buscarProduto(invalido.data[0].produto);
            cy.selecionarProduto();
            cy.aplicarQuantidade(invalido.data[0].quantidade)
            cy.aplicarCupom(invalido.data[0].cupom);
            cy.validaCupomInvalido();
        });
    });
});