/// <reference types="cypress" />

describe("Pesquisa no google", () => {
  
  it("Insere o texto 'Cypress' e realiza a pesquisa", () => {
    cy.visit("https://www.google.com.br/");
    cy.get('textarea[name="q"]').type("Cypress{enter}");
    // cy.get(".aajZCb > .lJ9FBc > center > .gNO89b").click();
    cy.url().should("include", "search?q=Cypress");
    cy.contains("Cypress: JavaScript Component Testing").should("exist");
  });
});
