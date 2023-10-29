describe('REVERSE', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  })

  it('コマを置くことができる', () => {
    cy.get('#next-disc-message').contains('黒');
    cy.get('.square-21').click();
    cy.get('#next-disc-message').contains('白');
  })

  it('最小手で白が勝つ', () => {
    cy.get('#next-disc-message').contains('黒');
    cy.setReversi(35);
    cy.setReversi(43);
    cy.setReversi(44);
    cy.setReversi(27);
    cy.setReversi(20);
    cy.setReversi(13);
    cy.setReversi(21);
    cy.setReversi(45);
    cy.setReversi(30);
    cy.setReversi(31);
    cy.get('#warning-message').contains('白の勝ちです');
  })

  it('最小手で黒が勝つ', () => {
    cy.get('#next-disc-message').contains('黒');
    cy.setReversi(35);
    cy.setReversi(45);
    cy.setReversi(38);
    cy.setReversi(27);
    cy.setReversi(52);
    cy.setReversi(43);
    cy.setReversi(34);
    cy.setReversi(44);
    cy.setReversi(20);
    cy.get('#warning-message').contains('黒の勝ちです');
  })
})