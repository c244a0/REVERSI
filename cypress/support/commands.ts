
///<reference types="cypress" />
Cypress.Commands.add('setReversi', (position: number) => {
  cy.get(`.square-${position}`).click();
  cy.wait(1000);
})
